package services

import (
	"aaron/albumapp/models"
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)


func (service *AlbumService) AddUser(user models.User) (*mongo.InsertOneResult, error) {

    res, err := service.client.Database("AlbumApp").Collection("Users").InsertOne(context.TODO(), user)

	return res, err

}

func (service *AlbumService) GetUserById(user *models.User, filter bson.D) (error) {

	err := service.client.Database("AlbumApp").Collection("Users").FindOne(context.TODO(), filter).Decode(&user)

	return err

}

func (service *AlbumService) CheckIfUserExists(user models.User, filter bson.D) (error) {

	err := service.client.Database("AlbumApp").Collection("Users").FindOne(context.TODO(), filter).Decode(&user)

	return err
}


func (service *AlbumService) SavedAlbumByID(album models.SavedAlbum, filter bson.D) (error) {


	err := service.client.Database("AlbumApp").Collection("SavedAlbums").FindOne(context.TODO(), filter).Decode(&album)

	return err

}


func (service *AlbumService) CheckIfReviewExistsByUser(album models.ReviewedAlbum, filter bson.D) (error) {

	err := service.client.Database("AlbumApp").Collection("ReviewedAlbums").FindOne(context.TODO(), filter).Decode(&album)

	return err
}

