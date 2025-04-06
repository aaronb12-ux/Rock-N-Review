package main

import (
	"context"
	"log"
	"net/http"
	

	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

//mongoDB Atlas connection string
const uri = "mongodb+srv://aaronbernstein:03Bubbles08@cluster0.yasvr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

//reference to the MongoDB Client
var mongoClient *mongo.Client 


type album struct {

	Name string `json:"name"` 
	Artist string `json:"artist"`
	Genre string `json:"genre"`
	Release_Date string `json:"release_date"`
	Image string  `json:"image"`
	Tracks []string `json:"tracks"`
}


func deleteAlbum(c *gin.Context) {
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


func updateAlbum(c *gin.Context) {
	//this function updates a movie based off the field passed into it. As of now, only rating can be modified.
	
	id := c.Param("id") 
	
	coll := mongoClient.Database("AlbumApp").Collection("Albums")
	
    objectId, _ := primitive.ObjectIDFromHex(id) 

	filter := bson.M{"_id": objectId} 

	var a album//new movie that will contain the rating

	if err := c.ShouldBindJSON(&a); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error" : err.Error()})
	}
 
	update := bson.D{{"$set", bson.D{{"genre", a.Genre}}}}

	result, err := coll.UpdateOne(context.TODO(), filter, update)

	if err != nil {
		panic(err)
	}

	c.IndentedJSON(http.StatusAccepted, result)

}


func getAlbums(c *gin.Context){
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

func addAlbum(c *gin.Context) {

	//this function adds an album to the database
    
   var newalbum album

   if err := c.BindJSON(&newalbum); err != nil {
	   return
   }

   cursor, err := mongoClient.Database("AlbumApp").Collection("SavedAlbums").InsertOne(context.TODO(), newalbum)

   if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error" : err.Error() })
   }

   c.IndentedJSON(http.StatusCreated, cursor)
}

func AlbumById(c *gin.Context) {

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

func init() {
	//this initializer function is run first when the program gets compiled, it establishes our connection to the mongodb client
	if err := connect_to_mongodb(); err != nil {
		log.Fatal("Could not connect to MongoDB")
	}
}

func connect_to_mongodb() error {
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(uri).SetServerAPIOptions(serverAPI)

	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
		panic(err)
	}

	err = client.Ping(context.TODO(), nil)
	mongoClient = client
	return err
}

func main() {

	router := gin.Default() //define the router

	router.Use(cors.New(cors.Config{
		AllowOrigins:		[]string{"http://localhost:5173"},
		AllowMethods: 		[]string{"PUT", "PATCH", "POST", "DELETE", "GET"},
		AllowHeaders:		[]string{"Content-Type"},
		AllowCredentials: 	true,	 		
	}))

	router.GET("/albums", getAlbums) 
	router.GET("/albums/:id", AlbumById)  
	router.POST("/albums", addAlbum) 
	router.PATCH("/albums/:id", updateAlbum)
	router.DELETE("/albums/:id", deleteAlbum)
	router.Run("localhost:8080") 
}
