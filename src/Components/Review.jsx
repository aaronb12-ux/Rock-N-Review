import { useState, useContext, useEffect } from "react";
import React from "react";
import { AuthContext } from "../Context/AuthContext";
import { PencilIcon, TrashIcon } from "lucide-react";
import { deleteReview } from "../API/reviewed";
import ReviewToast from "./ReviewToast";

const Review = ({
  userid,
  rating,
  date,
  text,
  _id,
  setRefresh,
  setModal,
  setEditReview,
  publisher,
}) => {
  const localeDate = new Date(date).toLocaleString().split(",")[0];
  const [userID, setUserID] = useState();
  const [showerror, setShowError] = useState(false);

  const user = useContext(AuthContext);

  useEffect(() => {
    if (user.userData && user.userData.userid) {
      setUserID(user.userData.userid);
    }
  }, [user]);

  const [ishovered, setIsHovered] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await deleteReview(_id);

      if (response === "error") {
        throw error;
      } else {
        setRefresh((refresh) => refresh + 1);
      }
    } catch (error) {
      setShowError(true);
    }
  };

  function handleEdit() {
    setModal((modal) => !modal);
    setEditReview({
      being_edited: true, //0
      existing_review: text, //1
      stars: rating,
      document_id: _id,
    });
    //need to change the CURRENT review
  }

  return (
    <div
      className="box-border px-4 py-2 bg-white rounded-lg shadow-md border border-gray-200 mb-4 w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between mb-3">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-5 h-5 fill-current ${
                i < rating ? "text-yellow-400" : "text-gray-300"
              }`}
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
          <div className="ml-2 text-sm text-gray-600">{rating}.0</div>
        </div>
        {userID === userid && ishovered ? (
          <div className="flex items-center gap-2">
            <button
              onClick={handleEdit}
              className=" rounded-full text-gray-400 hover:text-blue-500 transition"
              aria-label="Edit"
            >
              <PencilIcon className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className=" rounded-full text-gray-400 hover:text-red-500 transition"
              aria-label="Delete"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <p className="text-gray-700">{text}</p>
      <div className="mt-3 flex justify-between items-center">
        <span className="text-xs text-gray-500">Posted by: {publisher}</span>
        <span className="text-xs text-gray-500">{localeDate}</span>
      </div>

      {showerror ? (
        <ReviewToast
          err={"deleting"}
          setShowError={setShowError}
          showerror={showerror}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Review;
