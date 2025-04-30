import Stars from "./Stars";
import { useState } from "react";
import axios from "axios";

function ReviewForm({ postdata, setModal, setRefresh, edit }) {
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState("");

  const [existingReview, setExistingReview] = useState(edit[1]);

  const handleSubmit = () => {
    postdata.rating = stars;
  
    if (edit[0]) {
      postdata.review = existingReview
      console.log(postdata, edit[3])
        //do api call to edit the field. need to get the ID of the review
        
        axios.patch(`http://localhost:8080/reviewed-albums/${edit[3]}`, {"Rating": postdata.rating, "Review": postdata.review}).then
        ((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
              
    } else {
      postdata.review = review;
      axios
        .post("http://localhost:8080/reviewed-albums", postdata)
        .then((response) => {
          console.log(response.data);
        }) //POST request via Axios
        .catch((error) => {
          console.log(error);
        });
    }
    
    setModal(false);
    setRefresh(refresh => refresh + 1);
    setReview("")
    setStars("")
    setExistingReview("")    
  };

  //we pass in edit here.
  //if 'edit' is true, will the form with the current data of the review
  //and when the user clicks submit, do the api review edit handler

  return (
    <div className="">
      <div className="flex-grow max-w-2xl">
        <div className="backdrop-blur-sm border-4 border-indigo-400 rounded-xl p-6 shadow-lg bg-indigo-50">
          <div className="flex justify-center mb-4">
            <span className="text-3xl font-bold font-serif text-indigo-800 border-b-2 border-indigo-400 pb-2">
              Make Your Review
            </span>
          </div>

          <div className="mt-6">
            <span className="flex items-center justify-center text-2xl font-bold font-serif text-indigo-800">
              Your Rating
            </span>
            <div className="mt-2 flex justify-center">
              <Stars setStars={setStars} edit={edit} />
            </div>
          </div>

          <div className="mt-8">
            <label
              htmlFor="review"
              className="flex items-center justify-center text-2xl font-bold font-serif text-indigo-800 mb-3"
            >
              Your Review
            </label>

            {edit[0] ? (
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
