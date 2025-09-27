import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { addSavedAlbum } from "../API/saved";
import { deleteSavedAlbum } from "../API/saved";
import { checkIfSaved } from "../API/saved";
import { checkIfReviewExists } from "../API/reviewed";
import SaveToast from "./SaveToast";

export default function AlbumOptions({
  albumdata,
  only_tracks,
  setModal,
  modal,
  setDuplicateReview,
}) {
  const user = useContext(AuthContext); //user data
  const [savestate, setSaveState] = useState(false); //state for whether the album is saved or not
  const [savedId, setSavedId] = useState("");
  const [fetchsaved, setFetchedSaved] = useState(0); ///updates each time an album is reviewed
  const [savefail, setSaveFail] = useState(false);
  const [unsavefail, setUnsaveFail] = useState(false);

  const handlesave = async (e) => {
    //api call when saving an album when clicking the 'save' button

    e.preventDefault();

    const post_data = {
      //depending on whether the album we are reviewing is coming from a current saved or reviewed album, or from search, we adjust the fields
      albumid: albumdata.albumid || albumdata.id,
      name: albumdata.name,
      artist: albumdata.artist || albumdata.artists[0].name,
      userid: user.userData.userid,
      release_date: albumdata.release_date,
      image: albumdata.image || albumdata.images[0].url,
      tracks: only_tracks,
    };

    try {
      const response = await addSavedAlbum(post_data);

      if (response === "error") {
        throw error;
      } else {
        setSaveState(true);
        setFetchedSaved((fetchsaved) => fetchsaved + 1);
      }
    } catch (error) {
      setSaveFail(true);
    }
  };

  const deletesave = async (e) => {
    //api call when someone deletes an album

    e.preventDefault();

    const ID = {
      id: albumdata._id || savedId,
    };

    try {
      const response = await deleteSavedAlbum(ID.id); //deleting album by id

      if (response === "error") {
        throw error;
      } else {
        setSaveState(false);
      }
    } catch (error) {
      setUnsaveFail(true);
    }
  };

  useEffect(() => {
    //useEffect hook for checking if an album is saved. This is for when people travel to a saved album of theirs by search.
    //this same logic can also be done when going to album from their saved albums...
    const checkifsaved = async () => {
      const ID = {
        id: albumdata.albumid || albumdata.id,
      };

      try {
        const response = await checkIfSaved(user.userData.userid, ID.id);

        if (response) {
          setSaveState(true);
          setSavedId(response);
        } else {
          throw error;
        }
      } catch (error) {
        return;
      }
    };
    checkifsaved();
  }, [fetchsaved]);

  const handlereview = async () => {
    const ID = {
      id: albumdata.albumid || albumdata.id,
    };
    //first cherck if the album id is in the databse for 'reviewedalbums'
    //if yes, then

    try {
      const response = await checkIfReviewExists(user.userData.userid, ID.id);

      if (response) {
        setDuplicateReview(true);
      } else {
        throw error;
      }
    } catch (error) {
      setModal(!modal);
    }
  };

  return (
    <div className="mt-6 flex space-x-3">
      {savestate ? (
        <button //if 'savestate' is true. the album is saved.
          className="flex items-center justify-center p-2 bg-indigo-400 text-indigo-700 rounded-md transition cursor-pointer px-2"
          onClick={deletesave}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
        </button>
      ) : (
        <button
          className="flex items-center justify-center p-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-md transition cursor-pointer px-2"
          onClick={handlesave}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
        </button>
      )}

      <button
        className="flex items-center justify-center p-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-md transition cursor-pointer"
        onClick={handlereview}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      </button>

      {savefail ? (
        <div>
          <div
            id="toast-success"
            class="fixed flex items-center p-4 text-gray-500  bg-white divide-gray-200 rounded-lg shadow-sm bottom-5 left-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800"
            role="alert"
          >
            <button
              class="absolute top-0 right-3 bg-transparent border-none outline-none"
              onClick={() => setSaveFail(false)}
            >
              x
            </button>
            <div class="inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
              </svg>
              <span class="sr-only">Error icon</span>
            </div>
            <div class="ms-3 mt-1 text-sm font-normal">error saving</div>
          </div>
        </div>
      ) : (
        <div></div>
      )}

      {unsavefail ? <SaveToast setUnsaveFail={setUnsaveFail} /> : <div></div>}
    </div>
  );
}
/*
<div id="toast-danger" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div class="inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
        </svg>
        <span class="sr-only">Error icon</span>
    </div>
    <div class="ms-3 text-sm font-normal">Item has been deleted.</div>
    <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
    </button>
</div>



<div id="toast-bottom-left" class="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow-sm bottom-5 left-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800" role="alert">
   <div class="text-sm font-normal">Bottom left positioning.</div>
</div>
*/
