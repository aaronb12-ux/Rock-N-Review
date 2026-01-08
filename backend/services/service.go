package services

import (
	"go.mongodb.org/mongo-driver/mongo"
)

type AlbumService struct {
	client     *mongo.Client
}


func NewAlbumService(client *mongo.Client) *AlbumService {
	return &AlbumService{
		client:     client,
	}
}