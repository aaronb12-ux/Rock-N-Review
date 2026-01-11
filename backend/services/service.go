package services

import (
	"go.mongodb.org/mongo-driver/mongo"
)

type ReviewedService struct {
	client     *mongo.Client
}

type SavedService struct {
	client 	   *mongo.Client
}

type UserService struct {
	client     *mongo.Client
}


func NewReviewedService(client *mongo.Client) *ReviewedService {
	return &ReviewedService{
		client:     client,
	}
}

func NewSavedService(client *mongo.Client) *SavedService {
	return &SavedService{
		client: client,
	}
}

func NewUserService(client *mongo.Client) *UserService {
	return &UserService{
		client: client,
	}
}