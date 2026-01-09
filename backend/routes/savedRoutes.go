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
	"aaron/albumapp/controllers"
)

func SavedRoutes(router *gin.Engine) {

	var controller *controllers.AlbumController

	SavedGroup := router.Group("/saved-albums")
	{
		SavedGroup.GET("/:id", controller.GetSavedAlbums) //get saved by user id
		SavedGroup.POST("/", controller.AddSavedAlbum)
		SavedGroup.DELETE("/:id", controller.DeleteSavedAlbum)
	}
}

