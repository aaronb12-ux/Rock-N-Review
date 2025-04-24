import { useEffect, useState } from "react"
const Rating = ({reviews}) => {
    
    const [colors, setColors] = useState(["text-gray-400", "text-gray-400", "text-gray-400", "text-gray-400", "text-gray-400"])

    let stars_only = []
    let average_rating = 0

    function getAverageRating(stars) {
        let sum = 0
        for (const star of stars) {
            sum += star
        }
        return sum / stars.length
    }

    useEffect(() => {
        if (reviews) {
            stars_only = reviews.map((review) => review[1])
            average_rating = getAverageRating(stars_only)
            handleRating(average_rating)
        }
    }, [reviews])

    function handleRating(average_rating) {
         //just round up or down for now
         //get the number on the '.x' side of the average
         //if that number is .50 or over then round the integer up and vice versa
         const decimal = average_rating % 1
         if (decimal < .50) {
            average_rating = Math.floor(average_rating)       
         } 
         else {
            average_rating = Math.ceil(average_rating)
         }

         handleColors(average_rating)
    }

    function handleColors(average_rating) {
        switch (average_rating) {
            case 1:
                setColors(["text-yellow-400", "text-gray-400", "text-gray-400", "text-gray-400", "text-gray-400"])
                break
            case 2:
                setColors(["text-yellow-400", "text-yellow-400", "text-gray-400", "text-gray-400", "text-gray-400"])
                
                break
            case 3:
                setColors(["text-yellow-400", "text-yellow-400", "text-yellow-400", "text-gray-400", "text-gray-400"])
                
                break
            case 4:
                setColors(["text-yellow-400", "text-yellow-400", "text-yellow-400", "text-yellow-400", "text-gray-400"])
                
                break
            case 5:
                setColors(["text-yellow-400", "text-yellow-400", "text-yellow-400", "text-yellow-400", "text-yellow-400"])
                break            
        } 
    }
   


    return (
        <div className="flex justify-center items-center">
            <span className={`${colors[0]} text-5xl`}>&#9733;</span>
            <span className={`${colors[1]} text-5xl`}>&#9733;</span>
            <span className={`${colors[2]} text-5xl`}>&#9733;</span>
            <span className={`${colors[3]} text-5xl`}>&#9733;</span>
            <span className={`${colors[4]} text-5xl`}>&#9733;</span>
        </div>
    )
}


export default Rating