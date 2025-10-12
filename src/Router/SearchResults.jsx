import React from "react";
import Header from "../Components/Header";
import { useSearchParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getaccesstoken } from "../API/spotify";
import { getSearchedAlbums } from "../API/spotify";

function SearchResults() {
  
  const location = useLocation();
  const currentsearch = location.state?.searchInput;
  const [searchParams] = useSearchParams();
  const albumquery = searchParams.get("album");
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [badreq, setBadReq] = useState(false);

  

  const getTokenandAlbums = async () => {
    try {
      setLoading(true);

      const accessToken = await getaccesstoken();

      if (accessToken && albumquery) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        };

        const searchedAlbums = await getSearchedAlbums(headers, albumquery);

        setAlbums(searchedAlbums);
        return
      }
    } catch (err) {
      setBadReq(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTokenandAlbums();
  }, [albumquery]);

  if (badreq) {
    return (
      <div className="bg-slate-950 min-h-screen flex flex-col">
        <Header currentSearch={currentsearch} />
        {loading ? (
          <div className="flex-1 flex items-center justify-center bg-indigo-50">
            <div className="text-indigo-800 text-xl animate-pulse font-semibold">
              Loading Albums...
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-indigo-900 text-2xl mb-6">
              Failed To Load Albums :(
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen flex flex-col">
      <Header currentSearch={currentsearch} />
      {loading ? (
        <div className="flex-1 flex items-center justify-center bg-slate-950">
          <div className="text-white text-xl animate-pulse font-semibold">
            Loading Albums...
          </div>
        </div>
      ) : (
        <div className="py-8 mx-auto px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 px-1">
            {albums.map((album) => {
              return (
                <Link
                  style={{ textDecoration: 'none'}}
                  key={album.id}
                  className="bg-slate-900 m-6 rounded-none border-2 border-slate-800 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 max-w-xs overflow-hidden"
                  to={`/album/${encodeURIComponent(album.name)}`}
                  state={{ album: album, searchInput: currentsearch }}
                >
                  <div className="relative">
                    <div className="h-64 overflow-hidden border-b-2 border-slate-800">
                      <img
                        src={album.images[0].url}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute top-3 right-3 bg-slate-900 text-slate-300 text-xs px-2 py-1 font-serif">
                      {new Date(album.release_date).getFullYear()}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="font-bold text-base mt-1 text-white font-serif border-b border-slate-800 pb-2 mb-2">
                      {album.name}
                    </div>
                    <div className="text-slate-300 text-sm">
                      <div className="font-serif font-medium mb-1">
                        {album.artists[0].name}
                      </div>
                      <div className="text-xs text-slate-400 mt-2 flex items-center">
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

export default SearchResults;

