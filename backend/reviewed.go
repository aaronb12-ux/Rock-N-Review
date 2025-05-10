package main

import (
	"context"
	"net/http"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)


func AddReviewedAlbum(c *gin.Context) {
	var newalbum reviewedAlbum //object we are binding the json data to

	if err := c.BindJSON(&newalbum); err != nil { //if there is an error putting json data into new album object (json dats passing/handling issue)
		return
	}

	cursor, err := mongoClient.Database("AlbumApp").Collection("ReviewedAlbums").InsertOne(context.TODO(), newalbum) //inserting the 'newalbum' into the collection "AlbumApp"

	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()}) //if there was an error adding the newalbum to the databse
	}

	c.IndentedJSON(http.StatusCreated, cursor)
	
}

func GetReviewedAlbums(c *gin.Context){
	//this function gets all the movies in the database for us to read
	 
	 cursor, err := mongoClient.Database("AlbumApp").Collection("ReviewedAlbums").Find(context.TODO(), bson.D{{}})
	 
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

 func ReviewedAlbumById(c *gin.Context) {

	//this function takes an 'id' of a reviewedalbum, and it fetches all the albums with that specific id

	id := c.Param("id") //passed in 'id' parameter

	filter := bson.D{{"albumid", id}} //filter we are querying on

	cursor, err := mongoClient.Database("AlbumApp").Collection("ReviewedAlbums").Find(context.TODO(), filter) //fetching all albums with the query, 'filter'

	if err != nil { //error checking
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var results []reviewedAlbum //

	if err = cursor.All(context.TODO(), &results); err != nil {
		panic(err)
	}

    c.IndentedJSON(http.StatusAccepted, results)
}


func DeleteReviewedAlbum(c *gin.Context) {
	//This function deletes an entire movie document based on the past in ID
		
	   id := c.Param("id") 
	
	   objectId, err := primitive.ObjectIDFromHex(id) 
	
		if err != nil {
			c.IndentedJSON(http.StatusBadRequest, gin.H{"error" : err.Error()})
		}
	
		cursor, e := mongoClient.Database("AlbumApp").Collection("ReviewedAlbums").DeleteOne(context.TODO(), bson.M{"_id": objectId})
	
		if e != nil { 
			c.IndentedJSON(http.StatusBadRequest, gin.H{"error" : err.Error()})
		}
		
		c.IndentedJSON(http.StatusAccepted, cursor)
}

//users can update either the rating (stars 1-5) or the text review
func UpdateReviewedAlbum(c *gin.Context) {
	//this function updates a movie based off the field passed into it. As of now, only rating can be modified.
	
	id := c.Param("id") 
	
	coll := mongoClient.Database("AlbumApp").Collection("ReviewedAlbums")
	
	objectId, _ := primitive.ObjectIDFromHex(id) 

	filter := bson.M{"_id": objectId} 

	var a reviewedAlbum//new movie that will contain the rating

	if err := c.ShouldBindJSON(&a); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error" : err.Error()})
	}
 

	update_rating := bson.D{{"$set", bson.D{{"rating", a.Rating}}}}
	
	result, err := coll.UpdateOne(context.TODO(), filter, update_rating)

	if err != nil {
		panic(err)
	}

	update_review := bson.D{{"$set", bson.D{{"review", a.Review}}}}

	result2, err := coll.UpdateOne(context.TODO(), filter, update_review)

	if err != nil {
		panic(err)
	}

	c.IndentedJSON(http.StatusAccepted, result)
	c.IndentedJSON(http.StatusAccepted, result2)

}


