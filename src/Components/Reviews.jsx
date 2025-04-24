import { useEffect, useState } from "react"
import axios from "axios"
import Review from "./Review"
import Rating from "./Rating"

const Reviews = ({id, name}) => {

    const [reviews, setReviews] = useState()
  
    useEffect(() => {
        async function getReviews(id) {
            const response = await axios.get(`http://localhost:8080/reviewed-albums/${id}`)
            let data = response.data

            data = data.map(review => [review.review, review.rating, review.created, review.userid])
            setReviews(data) 

                
            //const reviews = albumentries.map(review => [review.review, review.rating, review.created, review.userid])
        }
        getReviews(id)
    }, [])

    
    return (
        <div className="box-border h-120 w-200 bg-indigo-400 rounded-lg shadow-[0_0_15px_8px_rgba(79,70,229,0.9)]">
            <div className="flex flex-col justify-center items-center">
            <div className="text-3xl font-bold font-serif text-indigo-100 tracking-widest drop-shadow-md w-full flex flex-row items-center justify-center flex-nowrap overflow-hidden whitespace-nowrap px-22">
                        <span className="flex-shrink-0">Reviews for: </span>
                        <span className="overflow-hidden text-ellipsis">{name}</span>
            </div>
                <div>
                    <div>
                        <Rating
                        reviews={reviews}
                        />
                    </div>  

                        <div className="overflow-y-auto max-h-90 p-4 mt-2 w-200" style={{scrollbarWidth: 'thin'}}>
                    
                    {reviews && 
                    reviews.map((review, index) => (
                        <Review
                        author={review[3]}
                        rating={review[1]}
                        date={review[2]}
                        text={review[0]}
                        />
                    ))
                    }     
                      </div>
                     
                        
                                              
                </div>
            </div>
        </div>
    )
}

export default Reviews

/*
0: "I love this album!"
​​
1: 4
​​
2: "2025-04-21T23:59:54.315Z"
​​
3: ""
​​
length: 4
*/

//<span className="flex justify-center text-7xl font-bold font-serif text-yellow-400 tracking-widest drop-shadow-md">&#9733;</span>