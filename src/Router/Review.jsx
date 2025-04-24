import AlbumCard from "../Components/AlbumCard";
import Header from "../Components/Header";
import ScrollToTop from "../Components/ScrollToTop";
import { useLocation } from "react-router-dom";

import Track from "../Components/Track";
import ReviewForm from "../Components/ReviewForm";
import TracksBanner from "../Components/TracksBanner";

function Review() {
  // This is the page where an album is reviewed

  const location = useLocation(); 
  const album = location.state?.albumdata; //album data
  const tracks = location.state?.only_tracks; //only the tracks
  const image = album.images[0].url; //album image

  const POST_DATA = { //Data to be sent via the post request when saving the album 
    name: album.name,
    artist: album.artists[0].name,
    release_date: album.release_date,
    image: image,
    tracks: tracks,
    rating: null, //at this time, there is no rating and review, so they are null
    review: null,
  }

  
    //axios.post("http://localhost:8080/reviewed-albums", POST_DATA).then(response => {console.log(response.data)}) //POST request via Axios
        //.catch(error => {console.log(error);});  
        return (
          <div className="flex flex-col min-h-screen bg-indigo-200">
            <Header
            />
            <ScrollToTop/>
            <div className="flex-grow box-border bg-indigo-300 mx-5 mt-5 mb-5 rounded-xl">
              <div className="flex justify-between px-8">
                <div className="flex items-center mt-5">
                  <AlbumCard
                    albumimage={image}
                    albumdata={album}
                    only_tracks={tracks}
                  />
                </div>
                <div className="mt-10 w-200">
          <ReviewForm
            postdata={POST_DATA}
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

export default Review;