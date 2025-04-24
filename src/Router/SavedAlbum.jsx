import Header from "../Components/Header";
import { useLocation } from "react-router-dom";
import AlbumCard from "../Components/AlbumCard";
import Track from "../Components/Track";
import ScrollToTop from "../Components/ScrollToTop";
import TracksBanner from "../Components/TracksBanner";
function SavedAlbum() {
  const location = useLocation();
  //first need to get data here
  const album = location.state?.album; //passed in selected album object
  const saved = location.state?.saved;
  const tracks = album.tracks;
  return (
    <div className="flex flex-col min-h-screen bg-indigo-200">
      <Header
       
      />
      <ScrollToTop/>
      <div className="flex-grow box-border bg-indigo-300 mx-5 mt-5 mb-5 rounded-xl">
        <div className="flex px-8">
          <div className="flex items-center justify-center mt-5 ">
            <AlbumCard
              albumimage={album.image}
              albumdata={album}
              saved={saved}
              only_tracks={tracks}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-center items-center py-4">
            <TracksBanner/>
          </div>
          <div className="w-full px-6 pb-8">
            <div className="py-5">
              {tracks.map((track) => (
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
export default SavedAlbum;
