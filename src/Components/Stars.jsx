import { useEffect, useState } from "react"
import React from "react"
function Stars({setStars, editreview}) {
    
    let [colors, setColors] = useState(["text-gray-400", "text-gray-400", "text-gray-400", "text-gray-400", "text-gray-400"])
   //user clicks on star three
   //pass three to the function
   useEffect(() => {
        if (editreview.being_edited) {
            switch (editreview.stars) {
                case 1:
                    setColors(["text-yellow-400", "text-gray-400", "text-gray-400", "text-gray-400", "text-gray-400"])
                    setStars(1)
                    break
                case 2:
                    setColors(["text-yellow-400", "text-yellow-400", "text-gray-400", "text-gray-400", "text-gray-400"])
                    setStars(2)
                    break
                case 3:
                    setColors(["text-yellow-400", "text-yellow-400", "text-yellow-400", "text-gray-400", "text-gray-400"])
                    setStars(3)
                    break
                case 4:
                    setColors(["text-yellow-400", "text-yellow-400", "text-yellow-400", "text-yellow-400", "text-gray-400"])
                    setStars(4)
                    break
                case 5:
                    setColors(["text-yellow-400", "text-yellow-400", "text-yellow-400", "text-yellow-400", "text-yellow-400"])
                    setStars(5)
                    break            
            } 
        }

   }, [])
   
   const handleClick = (num) => {
        //say num is 3, then set the first 3 stars to yellow
        switch (num) {
            case 0:
                setColors(["text-yellow-400", "text-gray-400", "text-gray-400", "text-gray-400", "text-gray-400"])
                setStars(1)
                break
            case 1:
                setColors(["text-yellow-400", "text-yellow-400", "text-gray-400", "text-gray-400", "text-gray-400"])
                setStars(2)
                break
            case 2:
                setColors(["text-yellow-400", "text-yellow-400", "text-yellow-400", "text-gray-400", "text-gray-400"])
                setStars(3)
                break
            case 3:
                setColors(["text-yellow-400", "text-yellow-400", "text-yellow-400", "text-yellow-400", "text-gray-400"])
                setStars(4)
                break
            case 4:
                setColors(["text-yellow-400", "text-yellow-400", "text-yellow-400", "text-yellow-400", "text-yellow-400"])
                setStars(5)
                break            
        }   
    }
    
    
    return (
        <div className="flex justify-center items-center">
           <span className={`${colors[0]} text-3xl cursor-pointer`}
           onClick={() => handleClick(0)}
           >
            &#9733;
           </span>
           <span className={`${colors[1]} text-3xl cursor-pointer`}
           onClick={() => handleClick(1)}
           >
            &#9733;
           </span>
           <span className={`${colors[2]} text-3xl cursor-pointer`}
           onClick={() => handleClick(2)}
           >
            &#9733;
           </span>
           <span className={`${colors[3]} text-3xl cursor-pointer`}
           onClick={() => handleClick(3)}
           >
            &#9733;
           </span>
           <span className={`${colors[4]} text-3xl cursor-pointer`}
           onClick={() => handleClick(4)}
           >
            &#9733;
           </span>
        </div>
       
    )
}

export default Stars