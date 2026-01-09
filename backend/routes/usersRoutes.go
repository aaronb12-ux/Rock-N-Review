package routes


import (
	"github.com/gin-gonic/gin"
	"aaron/albumapp/controllers"
)


func UserRoutes(router *gin.Engine, controller *controllers.AlbumController) {
	
	UsersGroup := router.Group("/users")
	{
		UsersGroup.POST("/", controller.AddUser)
		UsersGroup.GET("/:userid", controller.GetUserById)
		UsersGroup.GET("/:userid/saved-albums/:albumid", controller.SavedAlbumById)
		UsersGroup.GET("/:userid/reviewed-albums/:albumid", controller.CheckIfReviewExistsByUser)
	}
}
