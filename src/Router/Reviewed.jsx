import React, { useEffect, useContext } from "react"
import Header from "../Components/Header"
import ReviewedBanner from "../Components/ReviewedBanner"
import axios from "axios"
import { useState } from "react"
import { Link } from 'react-router-dom';
import ScrollToTop from "../Components/Layout"
import { AuthContext } from "../Context/AuthContext"

function Reviewed() {

    const user = useContext(AuthContext)
    
    const [reviewedalbums, setReviewedAlbums] = useState([])
    
    useEffect(() => { //fetching the reviewed albums
        async function getReviewedAlbums(id) {
            const response = await axios.get(`http://localhost:8080/reviewed-albums/user/${id}`)
            setReviewedAlbums(response.data)
            console.log(response)
      
        }
        getReviewedAlbums(user.userData.userid)
    }, [user.userData.userid])

    
    if (reviewedalbums === null) {
        return (<div className="bg-indigo-50 min-h-screen">
            <Header/>
            <div className="flex justify-center items-center mt-5">
            <ReviewedBanner/>
            </div>   
        </div>)
    }

    return (
        <div className="bg-indigo-50 min-h-screen">
                <Header/>
                <div className="flex items-center justify-center mt-5">
                <ReviewedBanner/>
                <ScrollToTop/>
                </div>   
                <div className="py-8 mx-auto px-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 px-4">
              {reviewedalbums.map((album) => {
                return (
                  <Link
                    key={album.id}
                    className="bg-indigo-100 m-6 rounded-none border-2 border-indigo-700 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 max-w-xs overflow-hidden"
                    to={`/reviewed/${encodeURIComponent(album.name)}`}
                    state={{album: album, saved: false}}
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
                      <div
                        className="font-bold text-base mt-1 text-indigo-900 font-serif border-b border-indigo-300 pb-2 mb-2"
                      >
                        {album.name}
                      </div>
                      <div
                        className="text-indigo-800 text-sm"
                      >
                        <div  className="font-serif font-medium mb-1">{album.artist}</div>
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

export default Reviewed