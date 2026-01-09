package services

import (
	"aaron/albumapp/models"
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/bson/primitive"
)


func (s *AlbumService) ReviewExistsByUser(filter bson.D) error {

	var album models.ReviewedAlbum

    err := s.client.Database("AlbumApp").Collection("ReviewedAlbums").FindOne(context.TODO(), filter).Decode(&album)

	return err

}