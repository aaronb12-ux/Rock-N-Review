package routes


import (
	"github.com/gin-gonic/gin"
	"aaron/albumapp/controllers"
)


func UserRoutes(router *gin.Engine, controller *controllers.UserController) {
	
	UsersGroup := router.Group("/users")
	{
		UsersGroup.POST("/", controller.AddUser) //DONE
		UsersGroup.GET("/:userid", controller.GetUserById) //DONE
		UsersGroup.GET("/:userid/saved-albums/:albumid", controller.SavedAlbumById)
		UsersGroup.GET("/:userid/reviewed-albums/:albumid", controller.CheckIfReviewExistsByUser)
	}
}
