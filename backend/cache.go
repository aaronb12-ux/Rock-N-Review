package main

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"sync"
	"time"

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

func init() {
	if err := godotenv.Load(".env.backend"); err != nil {
		log.Printf("Warning: could not load .env.backend file: %v", err)
	}
}

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

	//check if we have a valid cached token
	if cachedToken != "" && time.Now().Before(tokenExpiry) {
        return cachedToken, nil
    }

	//get credentials from enviornment
	client_id := os.Getenv("SPOTIFY_CLIENT_ID")
	client_secret := os.Getenv("SPOTIFY_CLIENT_SECRET")

	if client_id == "" || client_secret == "" {
		return "", fmt.Errorf("missing spotify credentials in environment variables")
	}

	//Encoding the credentials
	authHeader := base64.StdEncoding.EncodeToString([]byte(client_id + ":" + client_secret))

	//Prepare the request
	body := strings.NewReader("grant_type=client_credentials")
	req, err:= http.NewRequest("POST", "https://accounts.spotify.com/api/token", body)

	if err != nil {
		return "", fmt.Errorf("failed to create request: %w", err)
	}
	
	
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Set("Authorization", "Basic "+authHeader)

	//Send the request
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", fmt.Errorf("failed to send the request, %w", err)
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