import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import { Link, useLocation } from 'react-router-dom';
import TrendingBanner from "../Components/TrendingBanner";
import ScrollToTop from "../Components/Layout";
import { getaccesstoken } from "../API/spotify"
import { getTopAlbums } from "../API/spotify"
import {featuredalbums} from "../Data/featured"

function HomePage() {

    const location = useLocation() //location function for getting search input passed as state through page navigation
    const [searchInput, setCurrentSearch] = useState(location.state?.searchInput) //search input passed through page navigation
    const [topalbums, setTopAlbums] = useState([]) //state that will store the data retrieved from the API call 'getinfo()'
    const [token, setToken] = useState("")
    const [loading, setLoading] = useState(true);


  
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
    useEffect(() => {
      
      const getimage = async () => {

            const query = "Dangerous: The Double Album"
            const response = await getSearchedAlbums(headers, query )
            console.log(response)   
      }

      getimage()
     
    }, [token])
*/

    return (
      <div className="bg-indigo-50 min-h-screen flex flex-col">

        
        <Header currentSearch={searchInput} />
        <ScrollToTop />
    
        {loading ? (
          <div className="flex-1 flex items-center justify-center bg-indigo-50">
            <div className="text-indigo-800 text-xl animate-pulse font-semibold">
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
                    key={album.id}
                    className="bg-indigo-100 border-2 border-indigo-700 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 w-full overflow-hidden"
                    to={`/album/${encodeURIComponent(album.name)}`}
                    state={{ album, searchInput }}
                  >
                    <div className="relative">
                      <div className="h-64 overflow-hidden border-b-2 border-indigo-700">
                        <img
                          src={album.images[0].url}
                          className="w-full h-full object-cover"
                          alt={album.name}
                        />
                      </div>
                      <div className="absolute top-3 right-3 bg-indigo-800 text-indigo-100 text-xs px-2 py-1 font-serif">
                        {new Date(album.release_date).getFullYear()}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="font-bold text-base mt-1 text-indigo-900 font-serif border-b border-indigo-300 pb-2 mb-2">
                        {album.name}
                      </div>
                      <div className="text-indigo-800 text-sm">
                        <div className="font-serif font-medium mb-1">
                          {album.artists[0].name}
                        </div>
                        <div className="text-xs text-indigo-700 mt-2 flex items-center">
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