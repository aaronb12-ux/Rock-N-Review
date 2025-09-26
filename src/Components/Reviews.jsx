import { useEffect, useState } from "react";
import Review from "./Review";
import Rating from "./Rating";
import { getReviewsByAlbum } from "../API/reviewed";
import ReviewToast from "./ReviewToast";
const Reviews = ({id, name, refresh, setRefresh, setModal, setEditReview }) => {
  
  const [reviews, setReviews] = useState();
  const [loading, setLoading] = useState(true);
  const [errorFetching, setErrorFetching] = useState(false)
  const [showerror, setShowError] = useState(false)
 
 useEffect(() => {
  const fetchReviews = async () => {
    //Reset error state and start loading
    setErrorFetching(false);
    setShowError(false);
    setLoading(true);
    
    try {
      const response = await getReviewsByAlbum(id);
      
      //Handle different response states
      if (response === "error") {
        setErrorFetching(true);
        setShowError(true);
      } else {
        //Set reviews array (empty array if no response/falsy response)
        setReviews(response || []);
      }
    } catch (error) {

      console.error("Failed to fetch reviews:", error);
      setErrorFetching(true);
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };
  
  fetchReviews();
}, [refresh, id]); 



  if (errorFetching) return (
    <div className="bg-white rounded-xl shadow-lg  overflow-hidden border border-indigo-100 w-full max-w-3xl mx-auto h-full">
      {/* Header section with gradient */}
      <div className="bg-indigo-900 px-3 py-4">
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
      
      <div className="flex justify-center items-center h-64 text-sm font-bold text-black">
            <p className="inlie-block">error getting reveiws </p> 
      </div>

      <ReviewToast
      err={"loading"}
      showerror={showerror}
      setShowError={setShowError}
      />


    </div>
  )


  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100 w-full max-w-3xl mx-auto h-full">
      {/* Header section with gradient */}
      <div className="bg-indigo-900 px-3 py-4">
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
                publisher={review[5]}
                setRefresh={setRefresh}
                setModal={setModal}
                setEditReview={setEditReview}
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


