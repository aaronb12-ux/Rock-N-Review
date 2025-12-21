import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import { Link, useLocation } from 'react-router-dom';
import TrendingBanner from "../Components/TrendingBanner";
import ScrollToTop from "../Components/Layout";
import { getaccesstoken } from "../API/spotify"
import { getTopAlbums } from "../API/spotify"
import {featuredalbums} from "../Data/featured"
import { getSearchedAlbums } from "../API/spotify";

function HomePage() {

    const location = useLocation() //location function for getting search input passed as state through page navigation
    const [searchInput, setCurrentSearch] = useState(location.state?.searchInput) //search input passed through page navigation
    const [topalbums, setTopAlbums] = useState([]) //state that will store the data retrieved from the API call 'getinfo()'
    const [token, setToken] = useState("")
    const [loading, setLoading] = useState(false);

    const headers = { //headers for spotify API call
      "Content-Type": "application/json",
      Authorization : "Bearer " + token,
  }

    useEffect(() => { //getting access token

       const getToken = async () => {
          try {
            const response = await getaccesstoken()
            setToken(response)
          } catch (err) {
            console.log("Failed to fetch token:", err)
          }
        }
          getToken()
}, [])

    
    useEffect(() => { //getting top albums 
        
      const getAlbums = async () => {

        try {
          const response = await getTopAlbums(headers)
          setTopAlbums(response)
        } catch (err) {
          console.log("Failed to fetch albums", err)
        } finally {
          setLoading(false)
        }
      }
      if (token) {
          getAlbums()
        }       
    }, [token])

    /*
    useEffect(() => { //FOR WHEN NEEDING TO CHANGE FEATURED ALBUMS
       
      const getimage = async () => {

       
            const query = "You'll be alright, kid"
             
            const response = await getSearchedAlbums(headers, query)
             
      }
      */

      getimage()
     
    }, [token])


    return (
      <div className="bg-slate-950 min-h-screen flex flex-col">
 
        <Header currentSearch={searchInput} />
        <ScrollToTop />
        {loading ? (
          <div className="flex-1 flex items-center justify-center bg-slate-950">
            <div className="text-white text-xl animate-pulse font-semibold">
              Loading Albums...
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center mt-5">
              <TrendingBanner />
            </div>
            <div className="py-8 mx-auto px-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-15 px-2">
                {featuredalbums.map((album) => (
                  <Link
                    style={{ textDecoration: 'none'}}
                    key={album.id}
                    className="bg-slate-900 border-2 border-slate-800 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 w-full overflow-hidden"
                    to={`/album/${encodeURIComponent(album.name)}`}
                    state={{ album, searchInput }}
                  >
                    <div className="relative">
                      <div className="h-64 overflow-hidden border-b-2 border-slate-800">
                        <img
                          src={album.images[0].url}
                          className="w-full h-full object-cover"
                          alt={album.name}
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
                          {album.artists[0].name}
                        </div>
                        <div className="text-xs text-slate-400 mt-2 flex items-center">
                          <span className="mr-2">Released:</span>
                          <span className="font-mono">{album.release_date}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
    
    
}

export default HomePage

//'https://api.spotify.com/v1/browse/new-releases?country=US&limit=20'
