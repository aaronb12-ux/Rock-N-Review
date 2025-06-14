package main

import (
	"encoding/base64"
	"encoding/json"
	"sync"
	"time"

	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	//"github.com/joho/godotenv"
)

type SpotifyTokenResponse struct {
	AccessToken string `json:"access_token"`
	TokenType string `json:"token_type"`
	ExpiresIn int `json:"expires_in"`
}

var (
	cachedToken string
	tokenExpiry time.Time
	tokenMutex sync.Mutex
)

func GetAccessToken(c *gin.Context) {

	token, err := getSpotifyToken()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"access_token": token})

}

func getSpotifyToken() (string, error) {
	
	tokenMutex.Lock()
	defer tokenMutex.Unlock()

	if cachedToken != "" && time.Now().Before(tokenExpiry) {
        fmt.Println("✅ Using cached Spotify token")
        return cachedToken, nil
    }

	if cachedToken != "" && time.Now().Before(tokenExpiry) {
		return cachedToken, nil
	}

	err := godotenv.Load(".env.backend")

	if err != nil {
		log.Fatal("Error loading env file:", err)
	}

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
		return "", err
	}

	defer resp.Body.Close()

	respBody, _ := io.ReadAll(resp.Body)

	var tokenResp SpotifyTokenResponse
	
	if err := json.Unmarshal(respBody, &tokenResp); err != nil {
		return "", err
	}

	cachedToken = tokenResp.AccessToken
	tokenExpiry = time.Now().Add(time.Duration(tokenResp.ExpiresIn) * time.Second)

	return cachedToken, nil

}