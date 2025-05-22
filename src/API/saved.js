import axios from "axios"

export async function getSavedAlbums(userid) {
    try {
        const response = await axios.get(`http://localhost:8080/saved-albums/${userid}`)
        return response.data
    } catch (error) {
        console.log("Error fetching saved albums: ", error)
    }
}