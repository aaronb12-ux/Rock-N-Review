package routes

import (
	"context"
	"fmt"
	//"fmt"
	"log"
	"os"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func SavedRoutes(router *gin.Engine) {
	SavedGroup := router.Group("/saved-albums")
	{
		SavedGroup.GET("/:id", GetSavedAlbums)
		SavedGroup.POST("/", AddSavedAlbum)
		SavedGroup.DELETE("/:id", DeleteSavedAlbum)
	}
}

