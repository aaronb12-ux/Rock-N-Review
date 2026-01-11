package services

import (
	"aaron/albumapp/models"
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"

)


func (service *SavedService) DeleteSaved(objectId primitive.ObjectID) error {


	_ , err := service.client.Database("AlbumApp").Collection("SavedAlbums").DeleteOne(context.TODO(), bson.M{"_id": objectId})

	return err
}


func (service *SavedService) GetSaved(filter bson.D) (*mongo.Cursor, error) {

	cursor, err := service.client.Database("AlbumApp").Collection("SavedAlbums").Find(context.TODO(), filter)

	return cursor, err

}

func (service *SavedService) AddSaved(newalbum models.SavedAlbum) (*mongo.InsertOneResult, error) {

	 cursor , err := service.client.Database("AlbumApp").Collection("SavedAlbums").InsertOne(context.TODO(), newalbum)

	 return cursor, err

}