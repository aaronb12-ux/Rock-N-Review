import Header from "../Components/Header";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AlbumCard from "../Components/AlbumCard"
import Track from "../Components/Track"
import ScrollToTop from "../Components/Layout";
import TracksBanner from "../Components/TracksBanner";
import Modal from "../Components/Modal";
import Reviews from "../Components/Reviews";
import DuplicateModal from '../Components/DuplicateModal'
import { getaccesstoken } from "../API/spotify";
import { getTracks } from "../API/spotify";


function Album() {

  const location = useLocation()

  const albumdata = location.state?.album //Album Data
  const search = location.state?.search //Search Query
  const [token, setToken] = useState("")
  const [albumtracks, setAlbumTracks] = useState([]) //State to hold the tracks fetched in the API call
  const [modal, setModal] = useState(false) //Modal
  const [refresh, setRefresh] = useState(0)
  //const [edit, setEdit] = useState([false, null, null, null]) 
  const [duplicatereview, setDuplicateReview] = useState(false)

  const [editreview, setEditReview] = useState(
    {
     being_edited: false, //0
     existing_review: null, //1
     stars: null,
     document_id: null,
                        })


  const albumqueries = {
    id: albumdata.albumid || albumdata.id,
    image: albumdata.image || albumdata.images[0].url
  }

  const headers = { //headers for api call
    "Content-Type": "application/json",
    Authorization : "Bearer " + token,
  }

  useEffect(() => { //getting access token
         const getToken = async () => {
            try {
              const token = await getaccesstoken()
                setToken(token)
            } catch (err) {
              console.log("Failed to fetch token:", err)
            }
          }
            getToken()
  }, [])

  useEffect(() => { //api call to get the tracks of the album
    const gettracks = async () => {
      try{
        const response = await getTracks(headers, albumqueries.id)
          setAlbumTracks(response)
      } catch(error) {
          console.log("Failed to fetch tracks:", error)
      }  
    }
    if (albumdata && token) {
      gettracks()
    }
  }, [albumdata, albumqueries.id , token])

  
  const only_tracks = albumtracks.map(album => [album.name, String(album.duration_ms)]) //getting only the tracks
  
  return (
    <div className="flex flex-col min-h-screen bg-indigo-50 w-full">
      {/* Header and Scroll To Top on page render*/}
      <ScrollToTop />
      <Header currentSearch={search} />
      
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto w-full px-4 py-6">
        {/* Album Info & Reviews Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Album Card Column - 40% width */}
          <div className="w-full md:w-2/5">
            <AlbumCard
              albumimage={albumqueries.image}
              albumdata={albumdata}
              only_tracks={only_tracks}
              setModal={setModal}
              modal={modal}
              setDuplicateReview={setDuplicateReview}
             
            />
          </div>
          {/* Reviews Column - 60% width */}
          <div className="w-full md:w-3/5">
            <Reviews
              id={albumqueries.id}
              name={albumdata.name}
              refresh={refresh}
              setRefresh={setRefresh}
              setModal={setModal}
              setEditReview={setEditReview}
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
      
      {/* Modal For Review */}
      {modal && (
        <Modal
          setModal={setModal}
          album={albumdata}
          only_tracks={only_tracks}
          setRefresh={setRefresh}
          editreview={editreview}
        />
      )}

      {/* Modal For Duplicate Review */}
      {duplicatereview && (
        <DuplicateModal 
         setDuplicateReview={setDuplicateReview}
        />
      )}
    </div>
  );
}

export default Album;