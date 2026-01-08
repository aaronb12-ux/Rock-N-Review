package services

import (
	"aaron/albumapp/models"
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/bson/primitive"
)


func Insert(mongoClient *mongo.Client, newalbum models.ReviewedAlbum) error {
	
	_ , err := mongoClient.Database("AlbumApp").Collection("ReviewedAlbums").InsertOne(context.TODO(), newalbum) 

	return err
}

func GetByUserID(mongoClient *mongo.Client, filter bson.D) error {

	_ , err := mongoClient.Database("AlbumApp").Collection("ReviewedAlbums").Find(context.TODO(), filter)

	return err
}

func GetByAlbumID(mongoClient *mongo.Client, filter bson.D) error {


	 _ , err := mongoClient.Database("AlbumApp").Collection("ReviewedAlbums").Find(context.TODO(), filter)

	 return err
}

func Delete(mongoClient *mongo.Client, objectId primitive.ObjectID) error {
	
	_, err := mongoClient.Database("AlbumApp").Collection("ReviewedAlbums").DeleteOne(context.TODO(), bson.M{"_id": objectId})

	return err
}


func Update(mongoClient *mongo.Client, filter bson.M, updateItem bson.D) error {
	
	_, err := mongoClient.Database("AlbumApp").Collection("ReviewedAlbums").UpdateOne(context.TODO(), filter, updateItem)

	return err
}



