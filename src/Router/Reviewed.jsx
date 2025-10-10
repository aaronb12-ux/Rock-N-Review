import React, { useEffect, useContext } from "react";
import Header from "../Components/Header";
import ReviewedBanner from "../Components/ReviewedBanner";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { getReviewedAlbums } from "../API/reviewed";
import { Music } from "lucide-react";


function Reviewed() {

  const user = useContext(AuthContext);

  const location = useLocation();
  const searchInput = location.state?.searchInput;

  const [reviewedalbums, setReviewedAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetcherror, setFetchError] = useState(false)

  useEffect(() => {
    //fetching the reviewed albums
    const getreviewedalbums = async (id) => {

        const response = await getReviewedAlbums(id);

        if (response === "error") {
          setFetchError(true)
        } else {
          setReviewedAlbums(response);
        }
          setLoading(false);
    };
   
    if (user.userData && user.userData.userid) {
      getreviewedalbums(user.userData.userid);
    }
    
  }, [user]);


  if (fetcherror) {
    return (
      <div className="bg-slate-900 min-h-screen">
        <Header currentSearch={searchInput} />
        <div className="flex items-center justify-center mt-5 ">
          <ReviewedBanner />
        </div>
        <div className="flex flex-col items-center justify-center mt-30 px-4 text-center">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
            <Music className="mr-1 text-slate-400 h-10 w-10" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-3">
          Error getting reviewed albums :(
          </h2>
          
          <p className="text-slate-300 text-2xl mb-6 max-w-md">
          Please try again soon. We apologize for the inconvenience.
          </p>
        
        </div>
      </div>
    );
  }

  if (reviewedalbums === null) {
    return (
      <div className="bg-slate-950 min-h-screen">
        <Header currentSearch={searchInput} />
        <div className="flex items-center justify-center mt-5 ">
          <ReviewedBanner />
        </div>
        <div className="flex flex-col items-center justify-center mt-30 px-4 text-center">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
            <Music className="mr-1 text-slate-400 h-10 w-10" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-3">
            No Reviewed Albums Yet
          </h2>
          
          <p className="text-slate-300 text-2xl mb-6 max-w-md">
            Start exploring and review albums to see them here
          </p>
        
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen flex flex-col">
      <Header currentSearch={searchInput} />
      <div className="flex items-center justify-center mt-5">
          <ReviewedBanner />
        </div>
      {loading ? (
        <div className="flex-1 flex items-center justify-center bg-slate-900 mb-10">
          <div className="text-white text-xl animate-pulse font-semibold">
            Loading Albums...
          </div>
        </div>
      ) : (
        <div className="px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {reviewedalbums.map((album) => {
              return (
               
                <Link
                  key={album.id}
                  className="bg-slate-900 m-6 rounded-none border-2 border-slate-800 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 max-w-xs overflow-hidden"
                  to={`/reviewed/${encodeURIComponent(album.name)}`}
                  state={{ album: album, saved: false, searchInput : searchInput}}
                >
                  <div className="relative">
                    <div className="h-64 overflow-hidden border-b-2 border-slate-800">
                      <img
                        src={album.image}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute top-3 right-3 bg-slate-800 text-slate-300 text-xs px-2 py-1">
                      {new Date(album.release_date).getFullYear()}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="font-bold text-base mt-1 text-white border-b border-slate-800 pb-2 mb-2">
                      {album.name}
                    </div>
                    <div className="text-slate-300 text-sm">
                      <div className="font-medium mb-1">
                        {album.artist}
                      </div>
                      <div className="text-xs text-slate-400 mt-2 flex items-center">
                        <span className="mr-2">Released:</span>
                        <span className="font-mono">{album.release_date}</span>
                      </div>
                      <div className="text-xs text-slate-400 mt-2 flex items-center">
                      <span className="mr-2">Review Made:</span> 
                        <span className="font-mono">{new Date(album.createdat).toLocaleString().split(',')[0]}</span>
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

export default Reviewed;
