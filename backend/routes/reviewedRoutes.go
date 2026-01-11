package routes


import (
	"github.com/gin-gonic/gin"
	"aaron/albumapp/controllers"
)


func ReviewedRoutes(router *gin.Engine, controller *controllers.ReviewedController) {

	ReviewedGroup := router.Group("/reviewed-albums")
	{
		ReviewedGroup.POST("/", controller.AddReviewedAlbum) //DONE
		ReviewedGroup.GET("/user/:userid", controller.GetReviewedAlbumsByUser) //DONE
		ReviewedGroup.GET("/:albumid", controller.GetAlbumReviewsById) //DONE
		ReviewedGroup.DELETE("/:id", controller.DeleteReviewedAlbum) //DONE
		ReviewedGroup.PATCH("/:id", controller.UpdateReviewedAlbum) //DONE
	}
}