import Stars from "./Stars";
import { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { addReview } from "../API/reviewed";
import { editReview } from "../API/reviewed";


function ReviewForm({ postdata, setModal, setRefresh, editreview }) {
  
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState("");
  const [zerorating, setZeroRating] = useState(false);
  const [noReview, setNoReview] = useState(false)

  const user = useContext(AuthContext)

  const [existingReview, setExistingReview] = useState(editreview.existing_review);

  const clear = () => {
    setModal(false);
    setRefresh((refresh) => refresh + 1);
    setReview("");
    setStars("");
    setExistingReview("");
    editreview.being_edited = false;
  };


  const handleSubmit = async () => {

    postdata.rating = stars;

    if (postdata.rating === 0) {  //invalid rating (0 stars)
      
      setNoReview(false)
      setZeroRating(true);

    } else if ((review === "" && editreview.being_edited === false) || (existingReview == "" && editreview.being_edited === true)) { //invalid review (empty textbox)
      
      setZeroRating(false)
      setNoReview(true)

    } else if (editreview.being_edited) { //if we are making an active edit for an existing review
      
      postdata.review = existingReview;
      const response = await editReview(postdata, editreview.document_id)
      if (response) { clear() }

    } else { //first review for the album by user
  
        postdata.review = review;
        postdata.userid = user.userData.userid
        postdata.publisher = user.userData.username
        const response = await addReview(postdata)
        if (response) { clear() } 
    }
  };

  //we pass in edit here.
  //if 'edit' is true, will the form with the current data of the review
  //and when the user clicks submit, do the api review edit handler

  return (
    <div className="">
      <div className="flex-grow max-w-2xl">
        <div className="backdrop-blur-sm border-4 border-indigo-700 rounded-xl p-6 shadow-lg bg-indigo-50">
          <div className="flex justify-center mb-4">
            <span className="text-3xl font-bold font-serif text-indigo-800 border-b-2 border-indigo-700 pb-2">
              Make Your Review
            </span>
          </div>

          <div className="mt-6 relative">
            <span className="flex items-center justify-center text-2xl font-bold font-serif text-indigo-800">
              Your Rating
            </span>
            <div className="mt-2 flex justify-center">
              <Stars setStars={setStars} editreview={editreview} />
            </div>
            {zerorating && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 top-[98%] text-red-500 px-2 py-1 ">
                 <span className="font-bold font-serif">Rating Cannot Be Zero </span>
              </div>
            )}
            {noReview && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 top-[98%] text-red-500 px-2 py-1 ">
                <span className="font-bold font-serif">Review Cannot Be Empty </span>
              </div>
            )}
          </div>

          <div className="mt-8">
            <label
              htmlFor="review"
              className="flex items-center justify-center text-2xl font-bold font-serif text-indigo-800 mb-3"
            >
              Your Review
            </label>

            {editreview.being_edited ? (
              <textarea
                id="review"
                rows="6"
                className="block p-4 w-full text-md text-gray-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 shadow-inner resize-none"
                value={existingReview}
                onChange={(e) => setExistingReview(e.target.value)}
              ></textarea>
            ) : (
              <textarea
                id="review"
                rows="6"
                className="block p-4 w-full text-md text-gray-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 shadow-inner resize-none"
                placeholder="Share your thoughts about this album..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>
            )}

            <div className="mt-6 flex justify-end">
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition-all duration-300 flex items-center space-x-2 cursor-pointer"
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
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;
