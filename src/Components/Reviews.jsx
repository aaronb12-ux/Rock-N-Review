import { useEffect, useState } from "react";
import axios from "axios";
import Review from "./Review";
import Rating from "./Rating";

const Reviews = ({ id, name, refresh, setRefresh, setModal, setEdit }) => {
  const [reviews, setReviews] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getReviews(id) {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/reviewed-albums/${id}`);
        
        let data = response.data;
        if (data === null) {
          setReviews([]);
          return;
        }
        
        data = data.map((review) => [
          review.review,
          review.rating,
          review.created,
          review.userid,
          review._id,
        ]);
        
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    }
    
    getReviews(id);
  }, [refresh]);


  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100 w-full max-w-3xl mx-auto h-full">
      {/* Header section with gradient */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 px-3 py-4">
        <h1 className="text-5xl md:text-5xl font-bold font-serif text-white tracking-wide flex items-center gap-2 overflow-hidden">
        <span className="flex-shrink-0 font-medium text-indigo-300 uppercase tracking-wide text-base md:text-lg bg-indigo-900/30 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm">Reviews for:</span>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap max-w-md font-medium">
            {name}
          </span>
        </h1>
      </div>
      
      {/* Rating summary section */}
      <div className="bg-indigo-50 py-2 border-b border-indigo-100">
        <Rating reviews={reviews} />
      </div>
      
      {/* Reviews list section */}
      <div className="px-3 py-3">
        {loading ? (
          <div className="flex justify-center items-center h-70">
            <div className="animate-pulse text-indigo-400">Loading reviews...</div>
          </div>
        ) : reviews && reviews.length > 0 ? (
          <div 
            className="overflow-y-auto max-h-70 pr-2" 
            style={{ scrollbarWidth: "thin", scrollbarColor: "#818cf8 #eff6ff" }}
          >
            {reviews.map((review, index) => (
              <Review
                key={review[4]}
                userid={review[3]}
                rating={review[1]}
                date={review[2]}
                text={review[0]}
                _id={review[4]}
                setRefresh={setRefresh}
                setModal={setModal}
                setEdit={setEdit}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-60 text-gray-500">
            No reviews yet. Be the first to leave a review!
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;

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
