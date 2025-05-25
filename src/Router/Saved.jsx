import Header from "../Components/Header";
import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { getSavedAlbums } from "../API/saved";

import SavedBanner from "../Components/SavedBanner";

function Saved() {
  const user = useContext(AuthContext);

  const location = useLocation();
  const currentsearch = location.state?.searchInput;

  const [albums, setAlbums] = useState([]); //state that will store all the saved albums
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //useEffect hook ran on initial page rendering
    const getsavedalbums = async (userid) => {
      const response = await getSavedAlbums(userid);
      setAlbums(response);
      setLoading(false);
    };
    getsavedalbums(user.userData.userid);
  }, [user.userData.userid]);

  if (albums === null) {
    return (
      <div className="bg-indigo-50 min-h-screen">
        <Header currentSearch={currentsearch} />
        <div className="flex items-center justify-center mt-5 ">
          <SavedBanner />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-indigo-50 min-h-screen flex flex-col">
      <Header currentSearch={currentsearch} />
      <div className="flex items-center justify-center mt-20 ">
        <SavedBanner />
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center bg-indigo-50 mb-5">
          <div className="text-indigo-200 text-xl animate-pulse font-semibold">
            Loading Albums...
          </div>
        </div>
      ) : (
        <div className="py-8 mx-auto px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 px-4">
            {albums.map((album) => {
              return (
                <Link
                  key={album.id}
                  className="bg-indigo-100 m-6 rounded-none border-2 border-indigo-700 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 max-w-xs overflow-hidden"
                  to={`/saved/${encodeURIComponent(album.name)}`}
                  state={{ album: album, saved: true }}
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
