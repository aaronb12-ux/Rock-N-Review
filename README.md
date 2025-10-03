# Rock N' Review - Song Album Review Application

VISIT THE APP HERE: https://rocknreview.app/

A full-stack web application where users can discover, review, and save their favorite albums. Browse trending music, share your thoughts, and build your personal music collection.

## Features

- **User Authentication** - Secure account creation and login
- **Music Discovery** - Browse current top trending albums
- **Search Functionality** - Find albums and artists instantly
- **Album Reviews** - Rate albums out of 5 stars and write detailed reviews
- **Review Management** - View, edit, and delete your past reviews
- **Album Collection** - Save albums to your personal library
- **Community Ratings** - See average ratings from all users
- **Review History** - Browse all past reviews from the community

## Tech Stack

### Frontend
- **React** - Modern UI library for building interactive user interfaces
- **Firebase Authentication** - Secure user authentication and session management

### Backend
- **Go** - High-performance RESTful API server
- **MongoDB** - NoSQL database for flexible data storage

### External APIs
- **Spotify API** - music data

### Database Collections
- `users` - User profiles and account information
- `reviewedalbums` - Album reviews with ratings and comments
- `savedalbums` - User's saved album collections

## API Endpoints

### Users
- `GET /users/:userid` - Get user by ID
- `POST /users` - Create new user
- `GET /users/username/:username` - Check username availability

### Reviews
- `GET /users/:userid/reviewed-albums/:albumid` - Check if review exists by user
- `POST /reviewed-albums` - Create new review
- `GET /reviewed-albums/user/:userid` - Get reviewed albums by user
- `PATCH /reviewed-albums/:id` - Update reviewed album (id = document id)
- `DELETE /reviewed-albums/:id` - Delete review

### Saved Albums
- `GET /saved-albums/:id` - Get user's saved albums
- `GET /users/:userid/saved-albums/:albumid` - Get specific saved album
- `POST /saved-albums` - Save an album
- `DELETE /saved-albums/:id` - Remove saved album

## Usage

1. **Create Account** - Sign up with email and password
2. **Browse Music** - Explore trending albums on the homepage
3. **Search** - Use the search bar to find specific albums or artists
4. **Review Albums** - Click on any album to leave a rating and review
5. **Save Albums** - Add albums to your personal collection
6. **Manage Reviews** - Edit or delete your past reviews from your profile

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) for music data
- [Firebase](https://firebase.google.com/) for authentication services
- [MongoDB](https://www.mongodb.com/) for database solutions
