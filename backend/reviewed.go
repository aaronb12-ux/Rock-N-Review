package main

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)


func AddReviewedAlbum(c *gin.Context) { //add new reviewed album to database

	var newalbum reviewedAlbum //object binding the json data to

	if err := c.BindJSON(&newalbum); err != nil { //if there is an error putting json data into new album object (json dats passing/handling issue)
		return
	}

	cursor, err := mongoClient.Database("AlbumApp").Collection("ReviewedAlbums").InsertOne(context.TODO(), newalbum) //inserting the 'newalbum' into the collection "AlbumApp"

	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()}) //if there was an error adding the newalbum to the databse
	}

	c.IndentedJSON(http.StatusCreated, cursor)
	
}

func GetReviewedAlbumsByUser(c *gin.Context){ //get specific users reviewed albums

	userid := c.Param("userid") 

	filter := bson.D{{"userid" , userid}} 
	 
	 cursor, err := mongoClient.Database("AlbumApp").Collection("ReviewedAlbums").Find(context.TODO(), filter)
	 
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

 func GetAlbumReviewsById(c *gin.Context) { //Get all reviews from a specific album

	//this function takes an 'albumid' of a reviewedalbum, and it fetches all the albums with that specific id

	albumid := c.Param("albumid") //passed in 'id' parameter

	filter := bson.D{{"albumid", albumid}} //filter we are querying on

	cursor, err := mongoClient.Database("AlbumApp").Collection("ReviewedAlbums").Find(context.TODO(), filter) //fetching all albums with the query, 'filter'

	if err != nil { //error checking
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var results []reviewedAlbum 

	if err = cursor.All(context.TODO(), &results); err != nil {
		panic(err)
	}

    c.IndentedJSON(http.StatusAccepted, results)
}


func DeleteReviewedAlbum(c *gin.Context) { //deletes an entire review document from 'ReviewedAlbums'
	
		
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


func CheckIfReviewExistsByUser(c *gin.Context) {

	userid := c.Param("userid")
	albumid := c.Param("albumid")

	filter := bson.D{
		{"userid", userid},
		{"albumid", albumid},
	}

	var album reviewedAlbum

	err := mongoClient.Database("AlbumApp").Collection("ReviewedAlbums").FindOne(context.TODO(), filter).Decode(&album)

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


