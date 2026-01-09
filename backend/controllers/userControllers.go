package controllers


import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	//"go.mongodb.org/mongo-driver/bson/primitive"
	//"go.mongodb.org/mongo-driver/mongo"
)

func(controller *AlbumController) addUser(c *gin.Context) {

	var newUser User //new user struct

	if err := c.BindJSON(&newUser); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error" : "Invalid request payload"})
		return
	}

	result, err := mongoClient.Database("AlbumApp").Collection("Users").InsertOne(context.TODO(), newUser)

	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error" : err.Error()})
	}

	c.IndentedJSON(http.StatusCreated, gin.H{
		"message" : "User created successfully",
		"userId" : newUser.UserID,
		"insertedId" : result.InsertedID,
	})
	
}

func (controller *AlbumController) getUserById(c *gin.Context) {

	 userid := c.Param("userid")


	 filter := bson.D{{"userid", userid}}

	 var user User

	 err := mongoClient.Database("AlbumApp").Collection("Users").FindOne(context.TODO(), filter).Decode(&user)

	 if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error" : "error getting user"})
		return
	 }

	 c.IndentedJSON(http.StatusAccepted, user)

}


func (controller *AlbumController) checkIfUserExists(c *gin.Context) {

	username := c.Param("username")

	filter := bson.D{{"username", username}}

	var user User

	err := mongoClient.Database("AlbumApp").Collection("Users").FindOne(context.TODO(), filter).Decode(&user)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"error" : "username does not exist"})
		return
	}

	c.IndentedJSON(http.StatusOK, user)
}



//THIS GOES IN USERS CONTROLLER
func (controller *AlbumController) CheckIfReviewExistsByUser(c *gin.Context) {

	userid := c.Param("userid")
	albumid := c.Param("albumid")

	filter := bson.D{
		{"userid", userid},
		{"albumid", albumid},
	}

	var album models.ReviewedAlbum

	err := controller.service.ReviewExistsByUser(filter)

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