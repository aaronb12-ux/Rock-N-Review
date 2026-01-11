package controllers

import (
	"aaron/albumapp/models"
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

)

func (controller *ReviewedController) AddReviewedAlbum(c *gin.Context) { //add new reviewed album to database

	var newalbum models.ReviewedAlbum //object binding the json data to

	if err := c.BindJSON(&newalbum); err != nil { //if there is an error putting json data into new album object (json dats passing/handling issue)
		return
	}

	res , err := controller.service.AddReviewed(newalbum) //inserting the 'newalbum' into the collection "AlbumApp"

	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()}) //if there was an error adding the newalbum to the databse
	}

	c.IndentedJSON(http.StatusCreated, res)
	
}

func (controller *ReviewedController) GetReviewedAlbumsByUser(c *gin.Context) { //get specific users reviewed albums

	userid := c.Param("userid") 

	filter := bson.D{{"userid" , userid}} 
	 
	cursor, err := controller.service.GetReviewedByUserID(filter)
	 
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

 func (controller *ReviewedController) GetAlbumReviewsById(c *gin.Context) { //Get all reviews from a specific album

	//this function takes an 'albumid' of a reviewedalbum, and it fetches all the albums with that specific id

	albumid := c.Param("albumid") //passed in 'id' parameter

	filter := bson.D{{"albumid", albumid}} //filter we are querying on

	cursor, err := controller.service.GetReviewedByAlbumID(filter)

	if err != nil { //error checking
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var results []models.ReviewedAlbum

	if err = cursor.All(context.TODO(), &results); err != nil {
		panic(err)
	}

    c.IndentedJSON(http.StatusAccepted, results)
}


func (controller *ReviewedController) DeleteReviewedAlbum(c *gin.Context) { //deletes an entire review document from 'ReviewedAlbums'
	
		
	   id := c.Param("id") 
	
	   objectId, err := primitive.ObjectIDFromHex(id) 
	
		if err != nil {
			c.IndentedJSON(http.StatusBadRequest, gin.H{"error" : err.Error()})
		}
	
		cursor, e := controller.service.DeleteReviewed(objectId)
	
		if e != nil { 
			c.IndentedJSON(http.StatusBadRequest, gin.H{"error" : err.Error()})
		}
		
		c.IndentedJSON(http.StatusAccepted, cursor)
}

//THIS GOES IN USERS CONTROLLER
/*
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
*/


//users can update either the rating (stars 1-5) or the text review
func (controller *ReviewedController) UpdateReviewedAlbum(c *gin.Context) {

	
	id := c.Param("id") 

	
	objectId, _ := primitive.ObjectIDFromHex(id) 

	filter := bson.M{"_id": objectId}

	var a models.ReviewedAlbum

	if err := c.ShouldBindJSON(&a); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error" : err.Error()})
	}
 
	update_rating := bson.D{{"$set", bson.D{{"rating", a.Rating}}}}
	
	res1, err1 := controller.service.UpdateReviewed(filter, update_rating)

	if err1 != nil {
		panic(res1)
	}

	update_review := bson.D{{"$set", bson.D{{"review", a.Review}}}}

	res2, err2 := controller.service.UpdateReviewed(filter, update_review)

	if err2 != nil {
		panic(res2)
	}

	c.IndentedJSON(http.StatusAccepted, res1)
	c.IndentedJSON(http.StatusAccepted, res2)

}