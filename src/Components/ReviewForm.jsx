import Stars from "./Stars";
import { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { addReview } from "../API/reviewed";
import { editReview } from "../API/reviewed";
import ReviewToast from "./ReviewToast";

function ReviewForm({ postdata, setModal, setRefresh, editreview }) {
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState("");
  const [zerorating, setZeroRating] = useState(false);
  const [noReview, setNoReview] = useState(false);
  const [makereviewerror, setMakeReviewError] = useState("")
  const [showerror, setShowError] = useState(false)

  console.log(postdata)


  const user = useContext(AuthContext);

  const [existingReview, setExistingReview] = useState(
    editreview.existing_review
  );

  const clear = () => {
    setModal(false);
    setRefresh((refresh) => refresh + 1);
    setReview("");
    setStars("");
    setExistingReview("");
    editreview.being_edited = false;
  };

 const handleSubmit = async () => {
  // Reset error states
  setZeroRating(false);
  setNoReview(false);
  
  // Validate rating
  if (postdata.rating === 0) {
    setZeroRating(true);
    return;
  }
  
  // Get current review text
  const currentReview = editreview.being_edited ? existingReview : review;
  
  // Validate review text
  if (!currentReview.trim()) {
    setNoReview(true);
    return;
  }
  
  // Prepare submission data
  const submissionData = {
    ...postdata,
    rating: stars,
    review: currentReview
  };
  
  // Add user data for new reviews
  if (!editreview.being_edited) {
    submissionData.userid = user.userData.userid;
    submissionData.publisher = user.userData.username;
  }
  
  try {
    // Submit review
    const response = editreview.being_edited 
      ? await editReview(submissionData, editreview.document_id)
      : await addReview(submissionData);
    
    // Handle response
    if (response === "error") {
      const errorType = editreview.being_edited ? "editing" : "making";
      setMakeReviewError(errorType);
      setShowError(true);
    } else if (response) {
      clear();
    }
  } catch (error) {
    // Handle unexpected errors
    console.error("Review submission failed:", error);
    setMakeReviewError(editreview.being_edited ? "editing" : "making");
    setShowError(true);
  }
};

  const handlemodal = () => {
    setModal((modal) => !modal);
    editreview.being_edited = false;
  };
  //we pass in edit here.
  //if 'edit' is true, will the form with the current data of the review
  //and when the user clicks submit, do the api review edit handler

  return (
    // This goes inside your ReviewForm component
<div className="backdrop-blur-sm border-4 border-slate-800 rounded-xl p-6 shadow-lg bg-slate-950">
  <button
    className="absolute top-3 right-3 text-slate-400 hover:text-slate-300 text-2xl font-bold transition"
    onClick={handlemodal}
  >
    ×
  </button>
  
  <div className="flex justify-center mb-4">
    <span className="text-3xl font-bold text-white border-b-2 border-slate-700 pb-2">
      Make Your Review
    </span>
  </div>

  <div className="mt-6 relative">
  <span className="flex items-center justify-center text-2xl font-bold text-white">
    Your Rating
  </span>
  <div className="mt-2 flex justify-center">
    <Stars setStars={setStars} editreview={editreview} />
  </div>
  <div className="mt-2 flex justify-center h-6"> {/* Fixed height container */}
    {zerorating && (
      <span className="text-red-400 font-bold text-sm">
        Rating Cannot Be Zero
      </span>
    )}
    {noReview && (
      <span className="text-red-400 font-bold text-sm">
        Review Cannot Be Empty
      </span>
    )}
  </div>
</div>

  <div className="mt-8">
    <label
      htmlFor="review"
      className="flex items-center justify-center text-2xl font-bold text-white mb-3"
    >
      Your Review
    </label>

    {editreview.being_edited ? (
      <textarea
        id="review"
        rows="6"
        className="block p-4 w-full text-md text-white bg-slate-900 rounded-lg border border-slate-700 focus:ring-slate-600 focus:border-slate-600 transition-all duration-300 shadow-inner resize-none min-h-[150px]"
        value={existingReview}
        onChange={(e) => setExistingReview(e.target.value)}
      />
    ) : (
      <textarea
        id="review"
        rows="6"
        className="block p-4 w-full text-md text-white bg-slate-900 rounded-lg border border-slate-700 focus:ring-slate-600 focus:border-slate-600 transition-all duration-300 shadow-inner resize-none min-h-[150px] placeholder-slate-500"
        placeholder="Share your thoughts about this album..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
    )}

    <div className="mt-6 flex justify-end">
      <button
        className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition-all duration-300 flex items-center space-x-2 cursor-pointer"
        onClick={handleSubmit}
      >
        <span>Submit</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>

  {/* Error Toast - positioned within the ReviewForm */}
  {makereviewerror && (
    <div className="mt-4">
      <ReviewToast
        err={makereviewerror}
        setShowError={setShowError}
        showerror={showerror}
      />
    </div>
  )}
</div>
  );
}

export default ReviewForm
