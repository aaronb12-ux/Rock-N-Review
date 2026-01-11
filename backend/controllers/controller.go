package controllers

import (
	"aaron/albumapp/services"
)

//Controller struct
type ReviewedController struct { //the controller has a reference to the all the services
	service *services.ReviewedService
}

type SavedController struct {
	service *services.SavedService
}

type UserController struct {
	service *services.UserService
}

//Constructor function
func NewReviewedController(service *services.ReviewedService) *ReviewedController {
	return &ReviewedController{
		service: service,
	}
}

func NewSavedController(service *services.SavedService) *SavedController {
	return &SavedController{
		service: service,
	}
}

func NewUserController(service *services.UserService) *UserController {
	return &UserController{
		service: service,
	}
}