package routes

import (
	"github.com/gin-gonic/gin"
	"aaron/albumapp/controllers"
)

func SavedRoutes(router *gin.Engine, controller *controllers.AlbumController) {


	SavedGroup := router.Group("/saved-albums")
	{
		SavedGroup.GET("/:id", controller.GetSavedAlbums) //get saved by user id
		SavedGroup.POST("/", controller.AddSavedAlbum)
		SavedGroup.DELETE("/:id", controller.DeleteSavedAlbum)
	}
}

