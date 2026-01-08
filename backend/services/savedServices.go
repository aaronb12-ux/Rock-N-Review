package services

import (
	"aaron/albumapp/models"
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"

)


func (s *AlbumService) DeleteSaved(objectId primitive.ObjectID) error {


	_ , err := s.client.Database("AlbumApp").Collection("SavedAlbums").DeleteOne(context.TODO(), bson.M{"_id": objectId})

	return err
}


func (s *AlbumService) GetSaved(filter bson.D) error {

	_ , err := s.client.Database("AlbumApp").Collection("SavedAlbums").Find(context.TODO(), filter)

	return err
}

func (s *AlbumService) AddSaved(newalbum models.SavedAlbum) (bson.M, error) {

	 cursor , err := s.client.Database("AlbumApp").Collection("SavedAlbums").InsertOne(context.TODO(), newalbum)

	 
}