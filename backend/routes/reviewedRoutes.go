package routes


import (
	"github.com/gin-gonic/gin"
	"aaron/albumapp/controllers"
)


func ReviewedRoutes(router *gin.Engine, controller *controllers.AlbumController) {

	ReviewedGroup := router.Group("/reviewed-albums")
	{
		ReviewedGroup.POST("/", controller.AddReviewedAlbum)
		ReviewedGroup.GET("/user/:userid", controller.GetReviewedAlbumsByUser)
		ReviewedGroup.GET("/:albumid", controller.GetAlbumReviewsById)
		ReviewedGroup.DELETE("/:id", controller.DeleteReviewedAlbum)
		ReviewedGroup.PATCH("/:id", controller.UpdateReviewedAlbum)
	}
}