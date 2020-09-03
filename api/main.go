package main

import (
	"log"
	"os"

	"net/http"

	"github.com/joho/godotenv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func imagePOST(c *gin.Context) {
	fileHeader, _ := c.FormFile("file")
	log.Println(fileHeader.Size, 128<<20)

	// capped at ~128mb
	if fileHeader.Size > 128<<20 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "File too big"})
		return
	}

	file, _ := fileHeader.Open()
	defer file.Close()

	c.DataFromReader(http.StatusOK, fileHeader.Size, "image/jpeg", file, map[string]string{
		"Content-Disposition": "attachment; filename=\"filename.jpg\"",
	})
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
