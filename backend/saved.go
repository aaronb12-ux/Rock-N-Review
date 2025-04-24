package main

import (
	"context"
	"net/http"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)


func DeleteSavedAlbum(c *gin.Context) {
	//This function deletes an entire movie document based on the past in ID
		
	   id := c.Param("id") 
	
		objectId, err := primitive.ObjectIDFromHex(id) 
	
		if err != nil {
			c.IndentedJSON(http.StatusBadRequest, gin.H{"error" : err.Error()})
		}
	
		cursor, e := mongoClient.Database("AlbumApp").Collection("SavedAlbums").DeleteOne(context.TODO(), bson.M{"_id": objectId})
	
		if e != nil { 
			c.IndentedJSON(http.StatusBadRequest, gin.H{"error" : err.Error()})
		}
		
		c.IndentedJSON(http.StatusAccepted, cursor)
	
	}
	

	func UpdateSavedAlbum(c *gin.Context) {
		//this function updates a movie based off the field passed into it. As of now, only rating can be modified.
		
		id := c.Param("id") 
		
		coll := mongoClient.Database("AlbumApp").Collection("Albums")
		
		objectId, _ := primitive.ObjectIDFromHex(id) 
	
		filter := bson.M{"_id": objectId} 
	
		var a reviewedAlbum//new movie that will contain the rating
	
		if err := c.ShouldBindJSON(&a); err != nil {
			c.IndentedJSON(http.StatusBadRequest, gin.H{"error" : err.Error()})
		}
	 
		update := bson.D{{"$set", bson.D{{"genre", a.Review}}}}
	
		result, err := coll.UpdateOne(context.TODO(), filter, update)
	
		if err != nil {
			panic(err)
		}
	
		c.IndentedJSON(http.StatusAccepted, result)
	
}



func GetSavedAlbums(c *gin.Context){
	//this function gets all the movies in the database for us to read
	 
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



 func AddSavedAlbum(c *gin.Context) {

	//this function adds an album to the database
    
   var newalbum savedAlbum

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

	//this function finds a movie by id and display all it's contents

	id := c.Param("id") 
	
	objectId, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	var album bson.M

	e := mongoClient.Database("AlbumApp").Collection("SavedAlbums").FindOne(context.TODO(), bson.D{{"_id", objectId}}).Decode(&album);

	if e != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
		
	c.IndentedJSON(http.StatusOK, album)
}