package services

import (
	"aaron/albumapp/models"
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/bson/primitive"
)


func (s *AlbumService) AddReviewed(newalbum models.ReviewedAlbum) (*mongo.InsertOneResult, error)  {
	
	res , err := s.client.Database("AlbumApp").Collection("ReviewedAlbums").InsertOne(context.TODO(), newalbum) 

	return res, err 
}

func (s *AlbumService) GetReviewedByUserID(filter bson.D) (*mongo.Cursor, error) {

	res , err := s.client.Database("AlbumApp").Collection("ReviewedAlbums").Find(context.TODO(), filter)

	return res, err
}

func (s *AlbumService) GetReviewedByAlbumID(filter bson.D) (*mongo.Cursor, error) {


	 res , err := s.client.Database("AlbumApp").Collection("ReviewedAlbums").Find(context.TODO(), filter)

	 return res, err
}

func (s *AlbumService) DeleteReviewed(objectId primitive.ObjectID) (*mongo.DeleteResult , error) {
	
	res , err := s.client.Database("AlbumApp").Collection("ReviewedAlbums").DeleteOne(context.TODO(), bson.M{"_id": objectId})

	return res, err
}

func (s *AlbumService) ReviewExistsByUser(filter bson.D) error {

	var album models.ReviewedAlbum

    err := s.client.Database("AlbumApp").Collection("ReviewedAlbums").FindOne(context.TODO(), filter).Decode(&album)

	return err

}


func (s *AlbumService) UpdateReviewed(filter bson.M, updateItem bson.D) (*mongo.UpdateResult, error) {
	
	res , err := s.client.Database("AlbumApp").Collection("ReviewedAlbums").UpdateOne(context.TODO(), filter, updateItem)

	return res, err
}

