import Header from "../Components/Header";
import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { getSavedAlbums } from "../API/saved";
import SavedBanner from "../Components/SavedBanner";
import { Music } from "lucide-react";
import ReviewedBanner from "../Components/ReviewedBanner";

function Saved() {
  const user = useContext(AuthContext);

  const location = useLocation();
  const searchInput = location.state?.searchInput;

  const [albums, setAlbums] = useState([]); //state that will store all the saved albums
  const [loading, setLoading] = useState(true);
  const [fetcherror, setFetchError] = useState(false)

  useEffect(() => {
    //useEffect hook ran on initial page rendering
    const getsavedalbums = async (userid) => {
      const response = await getSavedAlbums(userid);
      if (response === "error") {
        setFetchError(true)
      } else {
        setAlbums(response);
      }
      setLoading(false);
    };

    if (user.userData && user.userData.userid) {
      getsavedalbums(user.userData.userid);
    }
  }, [user]);

  

    if (fetcherror) {
      return (
        <div className="bg-indigo-50 min-h-screen">
          <Header currentSearch={searchInput} />
          <div className="flex items-center justify-center mt-5 ">
            <SavedBanner />
          </div>
          <div className="flex flex-col items-center justify-center mt-30 px-4 text-center">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
              <Music className="mr-1 text-indigo-700 h-10 w-10" />
            </div>
            
            <h2 className="text-2xl font-bold text-indigo-800 mb-3">
              Error getting saved albums :(
            </h2>
            
            <p className="text-indigo-900 text-2xl mb-6 max-w-md">
              Please try again soon. We apologize for the inconvenience.
            </p>
          
          </div>
        </div>
      );
  }
    
    if (albums === null) {
      return (
        <div className="bg-indigo-50 min-h-screen">
          <Header currentSearch={searchInput} />
          <div className="flex items-center justify-center mt-5 ">
            <SavedBanner />
          </div>
          <div className="flex flex-col items-center justify-center mt-30 px-4 text-center">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
              <Music className="mr-1 text-indigo-700 h-10 w-10" />
            </div>
            
            <h2 className="text-2xl font-bold text-indigo-800 mb-3">
              No Saved Albums Yet
            </h2>
            
            <p className="text-indigo-900 text-2xl mb-6 max-w-md">
              Start exploring and save albums to see them here
            </p>
          
          </div>
        </div>
      );
  }


  return (
    <div className="bg-indigo-50 min-h-screen flex flex-col">
      <Header currentSearch={searchInput} />
      <div className="flex items-center justify-center mt-5">
            <SavedBanner />
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center bg-indigo-50 mb-10">
          <div className="text-indigo-800 text-xl animate-pulse font-semibold">
            Loading Albums...
          </div>
        </div>
      ) : (
        <div className="px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            {albums.map((album) => {
              return (
                <Link
                  key={album.id}
                  className="bg-indigo-100 m-6 rounded-none border-2 border-indigo-700 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 max-w-xs overflow-hidden"
                  to={`/saved/${encodeURIComponent(album.name)}`}
                  state={{ album: album, saved: true, searchInput: searchInput }}
                >
                  <div className="relative">
                    <div className="h-64 overflow-hidden border-b-2 border-indigo-700">
                      <img
                        src={album.image}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute top-3 right-3 bg-indigo-800 text-indigo-100 text-xs px-2 py-1 font-serif">
                      {new Date(album.release_date).getFullYear()}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="font-bold mt-1 text-indigo-900 font-serif border-b border-indigo-300 pb-2 mb-2">
                      {album.name}
                    </div>
                    <div className="text-indigo-800 text-sm">
                      <div className="font-serif font-medium mb-1">
                        {album.artist}
                      </div>
                      <div className="text-xs text-indigo-700 mt-2 flex items-center">
                        <span className="mr-2">Released:</span>
                        <span className="font-mono">{album.release_date}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Saved;
