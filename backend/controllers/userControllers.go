package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"

	//"go.mongodb.org/mongo-driver/bson/primitive"
	//"go.mongodb.org/mongo-driver/mongo"
	"aaron/albumapp/models"
)

func(controller *UserController) AddUser(c *gin.Context) {

	var newUser models.User //new user struct

	if err := c.BindJSON(&newUser); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error" : "Invalid request payload"})
		return
	}

	result, err := controller.service.AddUser(newUser)

	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error" : err.Error()})
	}

	c.IndentedJSON(http.StatusCreated, gin.H{
		"message" : "User created successfully",
		"userId" : newUser.UserID,
		"insertedId" : result.InsertedID,
	})
	
}

func (controller *UserController) GetUserById(c *gin.Context) {

	 userid := c.Param("userid")

	 filter := bson.D{{"userid", userid}}

	 var user models.User

	 err := controller.service.GetUserById(&user, filter)

	 if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error" : "error getting user"})
		return
	 }

	 c.IndentedJSON(http.StatusAccepted, user)

}



func (controller *UserController) checkIfUserExists(c *gin.Context) {

	username := c.Param("username")

	filter := bson.D{{"username", username}}

	var user models.User

	err := controller.service.CheckIfUserExists(user, filter)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"error" : "username does not exist"})
		return
	}

	c.IndentedJSON(http.StatusOK, user)
}

func (controller *UserController) SavedAlbumById(c *gin.Context) {
    //takes in two params: the user ID and the album id
	//check all documents that contains the user ID
	//then check if any of those documents contain the album id for the albumid field

	userid := c.Param("userid")
	albumid := c.Param("albumid")

	filter := bson.D{
		{"userid", userid},
		{"albumid", albumid},
	}

	var album models.SavedAlbum
	err := controller.service.SavedAlbumByID(&album, filter)
	
	if err != nil {
		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{"message" : "album not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error" : err.Error()})
		return
	}

	c.JSON(http.StatusOK, album)
} 



func (controller *UserController) CheckIfReviewExistsByUser(c *gin.Context) {

	userid := c.Param("userid")
	albumid := c.Param("albumid")

	filter := bson.D{
		{"userid", userid},
		{"albumid", albumid},
	}

	var album models.ReviewedAlbum

	err := controller.service.CheckIfReviewExistsByUser(&album, filter)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{"message" : "album not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error" : err.Error()})
		return
	}

	c.JSON(http.StatusOK, album)
}