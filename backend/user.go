package main

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	//"go.mongodb.org/mongo-driver/bson/primitive"
	//"go.mongodb.org/mongo-driver/mongo"
)


//will have endpoints: edit user info, get user by id, delete user, add user


func addUser(c *gin.Context) {

	var newUser user //new user struct

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

func getUserById(c *gin.Context) {

	 userid := c.Param("userid")

	 filter := bson.D{{"userid", userid}}

	 var user user

	 err := mongoClient.Database("AlbumApp").Collection("Users").FindOne(context.TODO(), filter).Decode(&user)

	 if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error" : "error getting user"})
		return
	 }

	 c.IndentedJSON(http.StatusAccepted, user)

}



func checkIfUserExists(c *gin.Context) {

	username := c.Param("username")

	filter := bson.D{{"username", username}}

	var user user

	err := mongoClient.Database("AlbumApp").Collection("Users").FindOne(context.TODO(), filter).Decode(&user)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"error" : "username does not exist"})
		return
	}

	c.IndentedJSON(http.StatusOK, user)

	
}

