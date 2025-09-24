import axios from "axios"
import {API_BASE_URL} from '../Config/api'

export async function getReviewedAlbums(userid) {

    try {
        const response = await axios.get(`${API_BASE_URL}/reviewed-albums/user/${userid}`)
        return response.data
    } catch (error) {
        console.log("Error fetching albums", error)
        return "error"
    }
    
}

export async function checkIfReviewExists(userid, albumid) {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${userid}/reviewed-albums/${albumid}`)
        console.log("review exists")
        return response.status === 200

    } catch (error) {
        console.log("Review does not exist. Valid to make a review.")
    }
}

export async function getReviewsByAlbum(id) {

    try {
        const response = await axios.get(`${API_BASE_URL}/reviewed-albums/${id}`);
        let data = response.data;

        if (data === null) {
            return false
        }

        data = data.map((review) => [
            review.review,
            review.rating,
            review.created,
            review.userid,
            review._id,
            review.publisher,
          ]);

        return data  
        
    } catch (error) {
        console.log("error fetching reviews")
        return "error"
    }
}


export async function addReview(postdata) {
    try {
    const response = await axios.post(`${API_BASE_URL}/reviewed-albums`, postdata)
        return response.status >= 200 && response.status < 300;
    } catch (error) {
        console.log("error submitting post request:". error)
        return "error"
    }
}


export async function editReview(postdata, documentid) {
    try{
        const response = await axios.patch(`${API_BASE_URL}/reviewed-albums/${documentid}`, {
            Rating: postdata.rating,
            Review: postdata.review,
          })
          return response.status >= 200 && response.status < 300;
    } catch (error) {
         console.log("error updating review data", error)
         return "error"
    }
}


export async function deleteReview(document_id) {
    try {
        const response = await axios.delete(`${API_BASE_URL}/reviewed-albums/${document_id}`)
        console.log(response)
        return response.status >= 200 && response.status < 300;
    } catch (error) {
        console.log("error deleting the review", error)
        return "error"
    }

}