import axios from "axios"

export async function getReviewedAlbums(userid) {

    try {
        const response = await axios.get(`http://localhost:8080/reviewed-albums/user/${userid}`)
        return response.data
    } catch (error) {
        console.log("Error fetching albums", error)
    }
    
}

export async function addReviewedAlbum(post_data) {

    try {
        const response = await axios.post("http://localhost:8080/saved-albums", post_data)
        return response.status >= 200 && response.status < 300;
    } catch (error) {
        console.log('Error adding album to database: ', error)
    }

}