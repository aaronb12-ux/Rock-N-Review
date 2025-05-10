import { useState, useContext } from "react";
import React from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
//This is the review card.
//It is a card that lists the review, the date made, the rating, and the user
const Review = ({ userid, rating, date, text, _id, setRefresh, setModal, setEdit}) => {
  date = date.slice(0, 10);

  const user = useContext(AuthContext)
  const [ishovered, setIsHovered] = useState(false)

  //api call to delete the review
  function handleDelete() {
    axios
      .delete(`http://localhost:8080/reviewed-albums/${_id}`)
      .then((response) => {
        console.log(response.data);
        setRefresh((refresh) => refresh + 1);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }

  function handleEdit() {
    setModal(modal => !modal)
    setEdit([true, text, rating, _id])
    //need to change the CURRENT review
  }

  return (
    <div className="box-border px-4 py-2 bg-white rounded-lg shadow-md border border-gray-200 mb-4 w-full"
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
          { user[0].uid === userid && ishovered ? <div className="flex items-center gap-2">
          <button 
            onClick={handleEdit}
            className="rounded-full hover:bg-blue-50 transition-all duration-200 text-gray-500 hover:text-blue-500 cursor-pointer"
            aria-label="Edit review"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
            </svg>
          </button>
          <button 
            onClick={handleDelete}
            className="rounded-full hover:bg-red-50 transition-all duration-200 text-gray-500 hover:text-red-500 cursor-pointer"
            aria-label="Delete review"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </button>
        </div>
            :
            <div>
              </div>
          }
      </div>
      <p className="text-gray-700">{text}</p>
      <div className="mt-3 flex justify-between items-center">
        <span className="text-xs text-gray-500">Posted by {userid}</span>
        <span className="text-xs text-gray-500">{date}</span>
      </div>
    </div>
  );
};

export default Review;
