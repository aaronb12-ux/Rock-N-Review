import Header from "../Components/Header";
import Axios from "axios"
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AlbumCard from "../Components/AlbumCard"
import Track from "../Components/Track"
import ScrollToTop from "../Components/ScrollToTop";


function Album() {
    
      const location = useLocation() 
      const data = location.state?.album //passed in selected album object
      const search = location.state?.search
      const token = window.localStorage.getItem('ACCESS_TOKEN') //access token stored in local storage
      
      const [savedstate, setSavedState] = useState(false)

 
      const [albumtracks, setAlbumTracks] = useState([]) //state to hold the tracks
      const [albumimage, setAlbumImage] = useState() //image of the album
      
     
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

      
      return (
        <div className="bg-amber-50 "> 
          <Header 
          currentSearch={search}
          /> 
          <ScrollToTop/>
          <div className="flex px-8"> 
            <div className="w-1/2 flex items-center justify-center h-screen ">
              <AlbumCard
                albumimage={albumimage}
                albumdata={data}
                albumtracks={albumtracks}
                savedstate={savedstate}
              />
            </div>
            <div className="w-1/2 overflow-y-auto p-8">
              <div className="space-y-2">
                {albumtracks.map((track) => (
                  <Track
                    key={track.id} 
                    trackname={track.name}
                    trackduration={track.duration_ms}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )
}

export default Album


