import Header from "../Components/Header";
import Axios from "axios"
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AlbumCard from "../Components/AlbumCard"
import Track from "../Components/Track"
import ScrollToTop from "../Components/ScrollToTop";
import TracksBanner from "../Components/TracksBanner";
import Modal from "../Components/Modal";
import Reviews from "../Components/Reviews";

function Album() {

  const location = useLocation()
  const data = location.state?.album //Album Data
  const search = location.state?.search //Search Query
  const token = window.localStorage.getItem('ACCESS_TOKEN') //Access Token in local storage
  const [albumtracks, setAlbumTracks] = useState([]) //State to hold the tracks fetched in the API call
  const [albumimage, setAlbumImage] = useState() //Image of the album
  const [modal, setModal] = useState(false) //Modal
  
  const headers = { //headers for api call
    "Content-Type": "application/json",
    Authorization : "Bearer " + token,
  }

  useEffect(() => {
    async function gettracks() {
      const response = await Axios.get(`https://api.spotify.com/v1/albums/${data.id}/tracks`, {
        headers: headers
      })
      setAlbumTracks(response.data.items)
      setAlbumImage(data.images[0].url)
    }
    if (data) {
      gettracks()
    }
  }, [data])


  const only_tracks = albumtracks.map(album => [album.name, String(album.duration_ms)])

  return (
    <div className="flex flex-col min-h-screen bg-indigo-200 w-screen">
      {/* Header */}
      <Header
        currentSearch={search}
      />

      {/* Scroll to Top */}
      <ScrollToTop/>


      {/* Indigo Box the album card and tracks are inside  */}
      <div className="flex-grow box-border bg-indigo-300 mx-5 mt-5 mb-5 rounded-xl">
        
        {/* Album Card */}
        <div className="flex flex-grow px-8">
          <div className="mt-5">
            <AlbumCard
              albumimage={albumimage}
              albumdata={data}
              only_tracks={only_tracks}
              setModal={setModal}
              modal={modal}
            />
          </div>

        {/* Modal */}
        { modal && (
            <Modal
            setModal={setModal}
            album={data}
            only_tracks={only_tracks}
            />
        )
        }   
        <div className="flex flex-grow items-center justify-center p-3">
          <Reviews
          id={data.id}
          name={data.name}
          />
        </div>
       
        </div>
        <div>
          <div className="flex justify-center items-center py-4">
            <TracksBanner/>
          </div>
          <div className="w-full px-6 pb-8">
            <div className="py-5">
              {only_tracks.map((track) => (
                <Track
                  key={track.id}
                  trackname={track[0]}
                  trackduration={track[1]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Album