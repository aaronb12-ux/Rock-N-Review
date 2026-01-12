package main

import (
	"aaron/albumapp/controllers"
	"aaron/albumapp/routes"
	"aaron/albumapp/services"
	"context"
	"fmt"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

//mongoDB Atlas connection string
//reference to the MongoDB Client
var mongoClient *mongo.Client 


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
        return err 
    }

    err = client.Ping(context.TODO(), nil)
    mongoClient = client
    return err
}

func main() {

    reviewedService := services.NewReviewedService(mongoClient)
	savedService := services.NewSavedService(mongoClient)
	userService := services.NewUserService(mongoClient)

	reviewedController := controllers.NewReviewedController(reviewedService)
	savedController := controllers.NewSavedController(savedService)
	userController := controllers.NewUserController(userService)

	router := gin.Default() //define the router

	port := os.Getenv("PORT")

	if port == "" {
		port = "8080"
	}

	router.Use(cors.New(cors.Config{
    AllowOrigins: []string{
        "http://localhost:5173",              //For local development
        "https://rocknreview.app",            //For production
    },
    AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
    AllowHeaders:     []string{"Content-Type", "Authorization"},
    AllowCredentials: true,
    }))

	routes.ReviewedRoutes(router, reviewedController)
	routes.SavedRoutes(router, savedController)
	routes.UserRoutes(router, userController)
	router.POST("/api/spotify/token", GetAccessToken)
	router.Run(":" + port)  
}
