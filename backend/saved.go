package main

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	
)

func DeleteSavedAlbum(c *gin.Context) {


		id := c.Param("id") 
	
		objectId, err := primitive.ObjectIDFromHex(id) 
	
		if err != nil {
			c.IndentedJSON(http.StatusBadRequest, gin.H{"error" : err.Error()})
			return
		}
	
		_ , e := mongoClient.Database("AlbumApp").Collection("SavedAlbums").DeleteOne(context.TODO(), bson.M{"_id": objectId})
	
		if e != nil { 
			c.IndentedJSON(http.StatusBadRequest, gin.H{"error" : e.Error()})
			return
		}
		
		c.IndentedJSON(http.StatusAccepted, gin.H{"deletedID" : objectId.Hex()})
	
}
	

/*
func GetSavedAlbums(c *gin.Context){
	
	 
	 cursor, err := mongoClient.Database("AlbumApp").Collection("SavedAlbums").Find(context.TODO(), bson.D{{}})
	 
	 if err != nil {
		 c.IndentedJSON(http.StatusInternalServerError, gin.H{"error" : err.Error()})
		 return
	 }
 
	 //Map results
	 var albums []bson.M
	 if err = cursor.All(context.TODO(), &albums); err != nil {
		 c.IndentedJSON(http.StatusInternalServerError, gin.H{"error" : err.Error()})
		 return
	 }
 
	 c.IndentedJSON(http.StatusOK, albums)
 }
*/


 func AddSavedAlbum(c *gin.Context) {

	
    
   var newalbum SavedAlbum

   if err := c.BindJSON(&newalbum); err != nil {
	   return
   }

   cursor, err := mongoClient.Database("AlbumApp").Collection("SavedAlbums").InsertOne(context.TODO(), newalbum)

   if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error" : err.Error() })
   }

   c.IndentedJSON(http.StatusCreated, cursor)
}


func SavedAlbumById(c *gin.Context) {
    //takes in two params: the user ID and the album id
	//check all documents that contains the user ID
	//then check if any of those documents contain the album id for the albumid field

	userid := c.Param("userid")
	albumid := c.Param("albumid")

	filter := bson.D{
		{"userid", userid},
		{"albumid", albumid},
	}

	var album SavedAlbum
	err := mongoClient.Database("AlbumApp").Collection("SavedAlbums").FindOne(context.TODO(), filter).Decode(&album)
	
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


func GetSavedAlbums(c *gin.Context){
	//getting a specific USERS saved albums

	userid := c.Param("id")

	filter := bson.D{{"userid", userid}}
	
	cursor, err := mongoClient.Database("AlbumApp").Collection("SavedAlbums").Find(context.TODO(), filter)
	 
	 if err != nil {
		 c.IndentedJSON(http.StatusInternalServerError, gin.H{"error" : err.Error()})
		 return
	 }
 
	 //Map results
	 var albums []bson.M
	 
	 if err = cursor.All(context.TODO(), &albums); err != nil {
		 c.IndentedJSON(http.StatusInternalServerError, gin.H{"error" : err.Error()})
		 return
	 }
 
	 c.IndentedJSON(http.StatusOK, albums)

 }


