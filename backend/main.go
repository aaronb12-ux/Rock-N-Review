package main

import (
	"context"
	"fmt"
	//"fmt"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

//mongoDB Atlas connection string
//reference to the MongoDB Client
var mongoClient *mongo.Client 

type savedAlbum struct {
	ID primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	AlbumID string `json:"albumid"`
	Name string `json:"name"` 
	Artist string `json:"artist"`
	UserID string `json:"userid"`
	Release_Date string `json:"release_date"`
	Image string  `json:"image"`
	Tracks [][]string `json:"tracks"`
}

type reviewedAlbum struct {
	ID primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	AlbumID string `json:"albumid"`
	Name string `json:"name"`
	Artist string `json:"artist"`
	Publisher string `json:"publisher"`
	UserID string `json:"userid"`
	Release_Date string `json:"release_date"`
	Image string `json:"image"`
	Tracks [][]string `json:"tracks"`
	Rating int `json:"rating"`
	Review string `json:"review"`
	CreatedAt string `json:"created"`
}

type user struct {
	ID primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"` //document id
	UserID string `json:"userid"` //userid that firebase generates
	UserName string `json:"username"`
	Email string `json:"email"`
	CreatedAt string `json:"created"`
}


func init() {
	//this initializer function is run first when the program gets compiled, it establishes our connection to the mongodb client
 //load env file if it exists
 	//godotenv.Load() 

	if err := connect_to_mongodb(); err != nil {
		log.Fatal("Could not connect to MongoDB")
	}
}

func connect_to_mongodb() error {
    err := godotenv.Load(".env.backend")

    if err != nil {
        fmt.Println("Warning: could not load .env.file")
    }
    
    uri := os.Getenv("MONGODB_URI")

	fmt.Println(uri)

    if uri == "" {
        return fmt.Errorf("MONGODB_URI environment variable is not set") // ← Change this
    }


    serverAPI := options.ServerAPI(options.ServerAPIVersion1)
    opts := options.Client().ApplyURI(uri).SetServerAPIOptions(serverAPI)

    client, err := mongo.Connect(context.TODO(), opts)
    if err != nil {
        return err // ← Change this from panic(err)
    }

    err = client.Ping(context.TODO(), nil)
    mongoClient = client
    return err
}

func main() {

	router := gin.Default() //define the router

	port := os.Getenv("PORT")

	if port == "" {
		port = "8080"
	}
	
	router.Use(cors.New(cors.Config{
		AllowOrigins:		[]string{"https://album-review-app-blond.vercel.app"},
		AllowMethods: 		[]string{"PUT", "PATCH", "POST", "DELETE", "GET", "OPTIONS"},
		AllowHeaders:		[]string{"Content-Type"},
		AllowCredentials: 	true,	 		
	}))

	//endpoints for saved album
	router.GET("/saved-albums/:id", GetSavedAlbums) 

	router.GET("/users/:userid/saved-albums/:albumid", SavedAlbumById)

	router.POST("/saved-albums", AddSavedAlbum) 

	router.DELETE("/saved-albums/:id", DeleteSavedAlbum)

	//endpoints for reviewed album
	router.POST("/reviewed-albums", AddReviewedAlbum)

	router.GET("/users/:userid/reviewed-albums/:albumid", CheckIfReviewExistsByUser)

	router.GET("/reviewed-albums/user/:userid", GetReviewedAlbumsByUser) //userid = uid of the user

	router.GET("/reviewed-albums/:albumid", GetAlbumReviewsById) //

	router.DELETE("/reviewed-albums/:id", DeleteReviewedAlbum) //id = document id to delete

	router.PATCH("/reviewed-albums/:id", UpdateReviewedAlbum) //id = document id to update

	//endpoints for user data
	router.POST("/users", addUser)

	router.GET("/users/:userid", getUserById)

	router.GET("/users/username/:username", checkIfUserExists)

	//endpoints for spotify token handling
	router.POST("api/spotify/token", GetAccessToken)
	
	router.Run(":" + port)  
}
