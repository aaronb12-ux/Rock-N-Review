import axios from "axios"

export async function getaccesstoken() { //function to get the access token
    try {
      const response = await axios.post('http://localhost:8080/api/spotify/token')
      console.log(response)
      return response.data.access_token
    } catch (error) {
      console.log(error)
    }
  }

export async function getTopAlbums(headers) {  //function that gets the top albums on homepage
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


export async function getTracks(headers, apiquery) { //function that gets the tracks of a speciifc album
  try{
    const response = await axios.get(`https://api.spotify.com/v1/albums/${apiquery}/tracks`, {
      headers: headers
    })
    return response.data.items
  } catch(error) {
    console.log("Failed to fetch tracks: ", error)
    return "error"
  }
   
}

export async function getSearchedAlbums(headers, albumquery) {
  
  try {
    const response = await axios.get('https://api.spotify.com/v1/search?', {
      params: {
          q: albumquery,
          type: 'album',
          limit: 20
      },
      headers: headers       
  })
    
    return response.data.albums.items
  } catch (error) {
    console.log("Error fetching albums by search: ", error)
    return []
  }

}