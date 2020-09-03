# Base image
FROM golang:1.15-buster as base

# Install dependencies
RUN apt-get update && apt-get install -y \
    libvips-dev \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /go/src/api


# Production image
FROM base as prod

COPY . .

RUN go get -d -v ./...
RUN go install -v ./...

EXPOSE 8080

ENTRYPOINT [ "api" ]


# Dev image
FROM base as dev

RUN go get github.com/cosmtrek/air

VOLUME /go/src/api
EXPOSE 8080

CMD [ "air" ]
