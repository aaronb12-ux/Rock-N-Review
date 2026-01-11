package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ReviewedAlbum struct {
	ID primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	AlbumID string `json:"albumid"`
	Name string `json:"name"`
	Artist string `json:"artist"`
	Publisher string `json:"publisher"`
	UserID string `json:"userid"`
	Release_Date string `json:"release_date"`
	Image string `json:"image"`
	Tracks [][]string `json:"tracks"`
	Rating int `json:"rating"`
	Review string `json:"review"`
	CreatedAt string `json:"created"`
}