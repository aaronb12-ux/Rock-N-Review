import React from "react";
import Header from "../Components/Header";
import { useSearchParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios"
import { Link } from 'react-router-dom';




function SearchResults() {

    const location = useLocation()
    const accessToken = location.state?.accessToken
    const currentsearch = location.state?.searchInput
  

    const [searchParams] = useSearchParams()
    const albumquery = searchParams.get('album')
    

    const [albums, setAlbums] = useState([])

    const token = window.localStorage.getItem('ACCESS_TOKEN')
  
    const headers = {
        "Content-Type": "application/json",
        Authorization : "Bearer " + token,
    }

    useEffect(() => {
        async function getinfo() {     

            if (albumquery && token) {
                 
                  const response = await Axios.get('https://api.spotify.com/v1/search?', {
                    params: {
                        q: albumquery,
                        type: 'album',
                        limit: 20
                    },
                    headers: headers       
                })
                setAlbums(response.data.albums.items)  
            }
        }    
        if (albumquery) {
          getinfo()
        }             
    }, [albumquery])


    return (
        <div className="bg-indigo-50 min-h-screen">
          <Header 
          currentSearch={currentsearch}
          />
           <div className="py-8 mx-auto px-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 px-1">
              {albums.map((album) => {
                return (
                  <Link
                    key={album.id}
                    className="bg-indigo-100 m-6 rounded-none border-2 border-indigo-700 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 max-w-xs overflow-hidden"
                    to={`/album/${encodeURIComponent(album.name)}`}
                    state={{album : album, token : accessToken, search: currentsearch}}
                    >
                    <div className="relative">
                      <div className="h-64 overflow-hidden border-b-2 border-indigo-700">
                        <img
                          src={album.images[0].url}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute top-3 right-3 bg-indigo-800 text-indigo-100 text-xs px-2 py-1 font-serif">
                        {new Date(album.release_date).getFullYear()}
                      </div>
                    </div>
                    <div className="p-4">
                      <div
                        className="font-bold text-base mt-1 text-indigo-900 font-serif border-b border-indigo-300 pb-2 mb-2"
                      >
                        {album.name}
                      </div>
                      <div
                        className="text-indigo-800 text-sm"
                      >
                        <div  className="font-serif font-medium mb-1">{album.artists[0].name}</div>
                        <div className="text-xs text-indigo-700 mt-2 flex items-center">
                          <span className="mr-2">Released:</span> 
                          <span className="font-mono">{album.release_date}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )
    }
      
      export default SearchResults