package services

import (
	"aaron/albumapp/models"
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func DeleteSavedAlbumFromDatabase(mongoClient *mongo.Client, objectId primitive.ObjectID) error {

	_ , err := mongoClient.Database("AlbumApp").Collection("SavedAlbums").DeleteOne(context.TODO(), bson.M{"_id": objectId})

	return err
}

func GetFromDatabase(mongoClient *mongo.Client, filter bson.D) error {

	_ , err := mongoClient.Database("AlbumApp").Collection("SavedAlbums").Find(context.TODO(), filter)

	return err
}

func AddToDatabase(mongoClient *mongo.Client, newalbum models.SavedAlbum) error {

	 _ , err := mongoClient.Database("AlbumApp").Collection("SavedAlbums").InsertOne(context.TODO(), newalbum)

	 return err
}