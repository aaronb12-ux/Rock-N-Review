package routes

import (
	"github.com/gin-gonic/gin"
	"aaron/albumapp/controllers"
)

func SavedRoutes(router *gin.Engine, controller *controllers.SavedController) {


	SavedGroup := router.Group("/saved-albums")
	{
		SavedGroup.GET("/:id", controller.GetSavedAlbums) //DONE
		SavedGroup.POST("", controller.AddSavedAlbum) //DONE
		SavedGroup.DELETE("/:id", controller.DeleteSavedAlbum) //DONE
	}
}

