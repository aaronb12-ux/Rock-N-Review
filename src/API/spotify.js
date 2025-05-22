import axios from "axios"

export async function getaccesstoken() {
    try {
      const response = await axios.post('http://localhost:8080/api/spotify/token')
      return response.data.access_token
    } catch (error) {
      console.log(error)
    }
  }

export async function getTopAlbums(headers) {   
    //function returns a promise as it is async
    
    try {
      const response = await axios.get('https://api.spotify.com/v1/search', {
        params: {
          q: 'genre:"rock"',
          type: 'album',
          market: 'US',
          limit: 20
        },
        headers: headers
      })
      return response.data.albums.items
    } catch (error) {
      console.log(error)
    }      
}