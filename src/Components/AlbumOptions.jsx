import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";



function AlbumOptions({ albumdata, only_tracks, setModal, modal }) {

  
  const user = useContext(AuthContext)

  const [savestate, setSaveState] = useState(false); //save state for album
  const [savedId, setSavedId] = useState("")
  const [fetchsaved, setFetchedSaved] = useState(0)

  const handlesave = async (e) => { //api call when saving an album when clicking the 'save' button
    
    e.preventDefault();
    let POST_DATA
    
    if (albumdata.artist) { //if we want to save the album again WITHIN the saved albums page
      POST_DATA = {
        albumid: albumdata.albumid,
        name: albumdata.name,
        artist: albumdata.artist,
        userid: user[0].uid,
        release_date: albumdata.release_date,
        image: albumdata.image,
        tracks: only_tracks
      }
    } else { //if we want to save this album via SEARCH
      POST_DATA = { 
      albumid: albumdata.id,
      name: albumdata.name,
      artist: albumdata.artists[0].name,
      userid: user[0].uid,
      release_date: albumdata.release_date,
      image: albumdata.images[0].url,
      tracks: only_tracks,
    };
  }
    axios
      .post("http://localhost:8080/saved-albums", POST_DATA)
      .then((response) => {
        console.log(response.data);
        setSaveState(true);
        setFetchedSaved(fetchsaved => fetchsaved + 1)
      }) //POST request via Axios
      .catch((error) => {
        console.log(error);
      });
  };


  //delete does not work from search. this is because when we delete, we delete the entire document with the '_id'. Whe
  const deletesave = async (e) => { //api call when someone deletes an album
    
    e.preventDefault();
    console.log(albumdata)

    let id
    if (!savedId) {
      id = albumdata._id
    } else {
      id = savedId
    }

    axios
      .delete(`http://localhost:8080/saved-albums/${id}`)
      .then((response) => {
        setSaveState(false);
        console.log(response.data)
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
  };


  
  useEffect(() => { //useEffect hook for checking if an album is saved. This is for when people travel to a saved album of theirs by search. 
                    //this same logic can also be done when going to album from their saved albums...
    const checkifsaved = () => {
      let id
      if (albumdata.albumid) {
        id = albumdata.albumid //if this album is from the 'saved' or reviewed albums albums. 
      } else {
        id = albumdata.id //if this album is from search
      }
      
      axios
        .get(`http://localhost:8080/users/${user[0].uid}/saved-albums/${id}`)
        .then((response) => {
          if (response.status === 200) {
            setSaveState(true);
            setSavedId(response.data._id)
          }
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          return;
        });
    };
    checkifsaved()
  }, [fetchsaved])

  
  function handlereview() {
    
    let id
    if (albumdata.albumid) {
      id = albumdata.albumid //if this album is from the 'saved' or reviewed albums albums. 
    } else {
      id = albumdata.id //if this album is from search
    }
    //first cherck if the album id is in the databse for 'reviewedalbums'
    //if yes, then 
    axios
        .get(`http://localhost:8080/users/${user[0].uid}/reviewed-albums/${id}`)
        .then((response) => {
          if (response.status === 200) {
            console.log('review does exists')
            //do stuff to handle duplicate review attempt
          } else {
            setModal(!modal);
          } 
        }) 
        .catch((error) => {
          setModal(!modal);
        })
  }

  return (
    <div className="mt-6 flex space-x-3">
      <button className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md transition flex items-center justify-center cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            clipRule="evenodd"
          />
        </svg>
        Play
      </button>

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

export default AlbumOptions;
