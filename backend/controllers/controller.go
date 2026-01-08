package controllers

import (
	"aaron/albumapp/services"
)

//Controller struct
type AlbumController struct { //the controller has a reference to the all the services
	service *services.AlbumService
}

//Constructor function
func NewAlbumController(service *services.AlbumService) *AlbumController {
	return &AlbumController{
		service: service,
	}
}