package main

import (
	"encoding/base64"
	//"fmt"
	"io"
	//"log"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	//"github.com/joho/godotenv"
)

func getAccessToken(c *gin.Context) {

	client_id := os.Getenv("SPOTIFY_CLIENT_ID")
	client_secret := os.Getenv("SPOTIFY_CLIENT_SECRET")

	//Encoding the credentials
	authHeader := base64.StdEncoding.EncodeToString([]byte(client_id + ":" + client_secret))

	//Prepare the request
	body := strings.NewReader("grant_type=client_credentials")
	req, _ := http.NewRequest("POST", "https://accounts.spotify.com/api/token", body)
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Set("Authorization", "Basic "+authHeader)

	//Send the request
	resp, err := http.DefaultClient.Do(req)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error" : "Failed to call Spotify"})
		return
	}

	defer resp.Body.Close()


	respBody, _ := io.ReadAll(resp.Body)
	c.Data(resp.StatusCode, "application/json", respBody)


}