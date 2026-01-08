package controllers


import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"aaron/albumapp/services"
)

func deleteFromDatabase(c *gin.Context) {
	
	id := c.Param("id") 
	
	objectId, err := primitive.ObjectIDFromHex(id) 
	
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error" : err.Error()})
		return
	}
	
		e := services.DeleteSavedAlbumFromDatabase(&mongo.Client{}, objectId)
	
		if e != nil { 
			c.IndentedJSON(http.StatusBadRequest, gin.H{"error" : e.Error()})
			return
	}
		
		c.IndentedJSON(http.StatusAccepted, gin.H{"deletedID" : objectId.Hex()})
}