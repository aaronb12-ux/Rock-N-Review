import axios from "axios"

export async function getReviewedAlbums(userid) {

    try {
        const response = await axios.get(`http://https://album-review-app-lnmu.onrender.com/reviewed-albums/user/${userid}`)
        return response.data
    } catch (error) {
        console.log("Error fetching albums", error)
        return "error"
    }
    
}

export async function checkIfReviewExists(userid, albumid) {
    try {
        const response = await axios.get(`http://https://album-review-app-lnmu.onrender.com/users/${userid}/reviewed-albums/${albumid}`)
        console.log("review exists")
        return response.status === 200

    } catch (error) {
        console.log("Review does not exist. Valid to make a review.")
    }
}

export async function getReviewsByAlbum(id) {

    try {
        const response = await axios.get(`http://https://album-review-app-lnmu.onrender.com/reviewed-albums/${id}`);
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
    const response = await axios.post("http://https://album-review-app-lnmu.onrender.com/reviewed-albums", postdata)
        return response.status >= 200 && response.status < 300;
    } catch (error) {
        console.log("error submitting post request:". error)
        return "error"
    }
}


export async function editReview(postdata, documentid) {
    try{
        const response = await axios.patch(`http://https://album-review-app-lnmu.onrender.com/reviewed-albums/${documentid}`, {
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
        const response = await axios.delete(`http://https://album-review-app-lnmu.onrender.com/reviewed-albums/${document_id}`)
        console.log(response)
        return response.status >= 200 && response.status < 300;
    } catch (error) {
        console.log("error deleting the review", error)
        return "error"
    }

}