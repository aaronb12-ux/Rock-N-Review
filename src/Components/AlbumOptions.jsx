import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { addReviewedAlbum } from "../API/reviewed";
import { deleteSavedAlbum } from "../API/saved";
import { checkIfSaved } from "../API/saved";
import { checkIfReviewExists } from "../API/reviewed";



function AlbumOptions({ albumdata, only_tracks, setModal, modal, setDuplicateReview}) {

  const user = useContext(AuthContext) //user data
  const [savestate, setSaveState] = useState(false); //state for whether the album is saved or not
  const [savedId, setSavedId] = useState("") 
  const [fetchsaved, setFetchedSaved] = useState(0) ///updates each time an album is reviewed

  const handlesave = async (e) => { //api call when saving an album when clicking the 'save' button
    
    e.preventDefault();
    
    const post_data = { //depending on whether the album we are reviewing is coming from a current saved or reviewed album, or from search, we adjust the fields
      albumid: albumdata.albumid || albumdata.id,
      name: albumdata.name,
      artist: albumdata.artist || albumdata.artists[0].name,
      userid: user.userData.userid,
      release_date:  albumdata.release_date,
      image: albumdata.image || albumdata.images[0].url,
      tracks: only_tracks,
    }
    
    const response = await addReviewedAlbum(post_data) //post request -> returns true if submitted successfully

    if (response) { //if the post request was successfull
       setSaveState(true) 
       setFetchedSaved(fetchsaved => fetchsaved + 1)
    }

};

  //delete does not work from search. this is because when we delete, we delete the entire document with the '_id'. Whe
  const deletesave = async (e) => { //api call when someone deletes an album
    
    e.preventDefault();
    
    const ID = { //
      id: albumdata._id || savedId
    }

    const response = await deleteSavedAlbum(ID.id)
    if (response) {setSaveState(false)}

  };


  
  useEffect(() => { //useEffect hook for checking if an album is saved. This is for when people travel to a saved album of theirs by search. 
                    //this same logic can also be done when going to album from their saved albums...
    const checkifsaved = async () => {
      
        const ID = {
          id: albumdata.albumid || albumdata.id
        }

        const response = await checkIfSaved(user.userData.userid, ID.id)

        if (response) {
          setSaveState(true)
          setSavedId(response)
        }

      
        
    };
      checkifsaved()
  }, [fetchsaved])


  
  const handlereview = async () => {
    
    const ID = {
      id: albumdata.albumid || albumdata.id
    }
    //first cherck if the album id is in the databse for 'reviewedalbums'
    //if yes, then 

    const response = await checkIfReviewExists(user.userData.userid, ID.id)

    if (response) {
      setDuplicateReview(true)
    } else {
      setModal(!modal)
    }
  }
        

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
    </div>
  );
}

