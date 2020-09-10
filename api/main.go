package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"

	"net/http"

	"github.com/joho/godotenv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"github.com/h2non/bimg"
)

func imagePOST(c *gin.Context) {
	fileHeader, _ := c.FormFile("file")
	toFormat := c.PostForm("toFormat")
	fileName := strings.TrimSuffix(fileHeader.Filename, filepath.Ext(fileHeader.Filename))

	log.Println("Convert image", fileHeader.Size, toFormat)

	// Ensure supported output format
	if toFormat != "image/png" && toFormat != "image/jpeg" && toFormat != "image/webp" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unsupported conversion format"})
		return
	}

	// Map formats and extension
	ext := ""
	bimgFormat := bimg.PNG
	switch toFormat {
	case "image/png":
		ext = "png"
		bimgFormat = bimg.PNG
	case "image/jpeg":
		ext = "jpg"
		bimgFormat = bimg.JPEG
	case "image/webp":
		ext = "webp"
		bimgFormat = bimg.WEBP
	}

	// capped at ~128mb
	if fileHeader.Size > 128<<20 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "File too big"})
		return
	}

	// Read file into memory
	file, _ := fileHeader.Open()
	defer file.Close()
	buffer := make([]byte, fileHeader.Size)
	file.Read(buffer)

	// Convert image
	newImage, _ := bimg.NewImage(buffer).Convert(bimgFormat)

	c.Header("Content-Disposition", fmt.Sprintf("attachment; filename=\"%s.%s\"", fileName, ext))
	c.Data(http.StatusOK, toFormat, newImage)
}

func setupRouter() *gin.Engine {
	r := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{os.Getenv("API_ALLOW_ORIGIN")}
	config.ExposeHeaders = []string{"*"}
	r.Use(cors.New(config))

	r.GET("/healthz", func(c *gin.Context) {
		c.String(http.StatusOK, "ok")
	})

	r.POST("/image", imagePOST)

	return r
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	log.Println("conv.tools conversion API")

	r := setupRouter()
	r.Run()
}
