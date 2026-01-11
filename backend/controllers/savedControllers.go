package controllers


import (
	"net/http"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"aaron/albumapp/models"
)


func (controller *SavedController) DeleteSavedAlbum(c *gin.Context) {
	
	id := c.Param("id") 
	
	objectId, err := primitive.ObjectIDFromHex(id) 
	
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error" : err.Error()})
		return
	}

	e := controller.service.DeleteSaved(objectId)
	
	if e != nil { 
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error" : e.Error()})
		return
	}
		
	c.IndentedJSON(http.StatusAccepted, gin.H{"deletedID" : objectId.Hex()})
}

func (controller *SavedController) GetSavedAlbums(c *gin.Context) {
	
	userid := c.Param("id")

	filter := bson.D{{"userid", userid}}
	
	cursor, err := controller.service.GetSaved(filter)
	 
	 if err != nil {
		 c.IndentedJSON(http.StatusInternalServerError, gin.H{"error" : err.Error()})
		 return
	 }
 
	 //Map results 
	 var albums []bson.M
	 
	 if err = cursor.All(context.TODO(), &albums); err != nil {
		 c.IndentedJSON(http.StatusInternalServerError, gin.H{"error" : err.Error()})
		 return
	 }
 
	 c.IndentedJSON(http.StatusOK, albums)
}


func (controller *SavedController) AddSavedAlbum(c *gin.Context) {

   var newalbum models.SavedAlbum

   if err := c.BindJSON(&newalbum); err != nil {
	   return
   }

   cursor, err := controller.service.AddSaved(newalbum)

    if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error" : err.Error() })
    }

   c.IndentedJSON(http.StatusCreated, cursor)

}