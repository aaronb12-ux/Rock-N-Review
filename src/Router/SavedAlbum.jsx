import Header from "../Components/Header"
import { useLocation } from "react-router-dom"
import AlbumCard from "../Components/AlbumCard"
import Track from "../Components/Track"

function SavedAlbum() {
    const location = useLocation()
    //first need to get data here
    const album = location.state?.album //passed in selected album object
    const tracks = album.tracks

    return (
    <div className="bg-amber-50 h-screen">
        <Header/>
        <div className="flex px-8"> 
            <div className="w-1/2 flex items-center justify-center h-screen ">
              <AlbumCard
                albumimage={album.image}
                albumdata={album}
                albumtracks={album.tracks}
              />
            </div>
            <div className="w-1/2 overflow-y-auto p-8">
              <div className="space-y-2">
                {tracks.map((track) => (
                  <Track
                    key={track.id} 
                    trackname={track}
                  />
                ))}
              </div>
            </div>
          </div>
    </div>)
}

export default SavedAlbum