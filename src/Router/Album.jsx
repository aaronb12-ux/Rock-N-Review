import Header from "../Components/Header";
import Axios from "axios"
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AlbumCard from "../Components/AlbumCard"
import Track from "../Components/Track"
import ScrollToTop from "../Components/Layout";
import TracksBanner from "../Components/TracksBanner";
import Modal from "../Components/Modal";
import Reviews from "../Components/Reviews";


function Album() {
  const location = useLocation()
  const data = location.state?.album //Album Data
  const search = location.state?.search //Search Query
  const token = window.localStorage.getItem('ACCESS_TOKEN') //Access Token in local storage
  const [albumtracks, setAlbumTracks] = useState([]) //State to hold the tracks fetched in the API call
  const [modal, setModal] = useState(false) //Modal
  const [refresh, setRefresh] = useState(0)
  const [edit, setEdit] = useState([false, null, null, null]) 
  
  const headers = { //headers for api call
    "Content-Type": "application/json",
    Authorization : "Bearer " + token,
  }



 
  //def going to refactor this part...
  let idquery
  let apiquery
  let albumimage
  if (data.albumid) { //if we are traveling from the 'reviewed' page
    idquery = data.albumid
    apiquery = data.albumid
    albumimage = data.image
  } else { //if we are traveling from a search
    idquery = data.id
    apiquery = data.id
    albumimage = data.images[0].url
  }
  
  useEffect(() => { //api call to get the tracks of the album
    async function gettracks() {
      <ScrollToTop/>
      const response = await Axios.get(`https://api.spotify.com/v1/albums/${apiquery}/tracks`, {
        headers: headers
      })
      setAlbumTracks(response.data.items)
    }
    if (data) {
      gettracks()
    }
  }, [data, apiquery])
  
  const only_tracks = albumtracks.map(album => [album.name, String(album.duration_ms)]) //getting only the tracks
  
  return (
    <div className="flex flex-col min-h-screen bg-indigo-50 w-full">
      {/* Header */}
      <ScrollToTop />
      <Header currentSearch={search} />
      
      {/* Scroll to Top */}

      
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto w-full px-4 py-6">
        {/* Album Info & Reviews Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Album Card Column - 40% width */}
          <div className="w-full md:w-2/5">
            <AlbumCard
              albumimage={albumimage}
              albumdata={data}
              only_tracks={only_tracks}
              setModal={setModal}
              modal={modal}
             
            />
          </div>
          {/* Reviews Column - 60% width */}
          <div className="w-full md:w-3/5">
            <Reviews
              id={idquery}
              name={data.name}
              refresh={refresh}
              setRefresh={setRefresh}
              setModal={setModal}
              setEdit={setEdit}
            />
          </div>
        </div>
        
        {/* Tracks Section */}
        <div className="bg-white rounded-xl shadow-md border border-indigo-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 py-3 px-6">
            <TracksBanner />
          </div>
          
          <div className="p-6">
            {only_tracks.length > 0 ? (
              only_tracks.map((track, index) => (
                <Track
                  key={index}
                  trackname={track[0]}
                  trackduration={track[1]}
                />
              ))
            ) : (
              <div className="text-center py-8 text-indigo-400">
                Loading tracks...
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Modal */}
      {modal && (
        <Modal
          setModal={setModal}
          album={data}
          only_tracks={only_tracks}
          setRefresh={setRefresh}
          edit={edit}
        />
      )}
    </div>
  );
}

export default Album;