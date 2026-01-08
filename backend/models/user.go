package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)
type User struct {
	ID primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"` //document id
	UserID string `json:"userid"` //userid that firebase generates
	UserName string `json:"username"`
	Email string `json:"email"`
	CreatedAt string `json:"created"`
}