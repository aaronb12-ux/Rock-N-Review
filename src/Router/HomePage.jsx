import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Axios from "axios"
import { Link, useLocation } from 'react-router-dom';
import TrendingBanner from "../Components/TrendingBanner";

import {
    Container,
    Row,
    Card,
} from "react-bootstrap"


function HomePage({accessToken}) {

    const location = useLocation() //location function for getting search input passed as state through page navigation
    const [currentsearch, setCurrentSearch] = useState(location.state?.searchInput) //search input passed through page navigation
     
    const token = window.localStorage.getItem('ACCESS_TOKEN') //access token stored in the local storage
    
    const [topalbums, setTopAlbums] = useState([]) //state that will store the data retrieved from the API call 'getinfo()'


    const headers = { //headers for spotify API call
        "Content-Type": "application/json",
        Authorization : "Bearer " + token,
    }

    useEffect(() => { //useEffect function that runs when the access token is retrieved
        async function getinfo() {     
            //function returns a promise as it is async
            if (token) {
  
                  const response = await Axios.get('https://api.spotify.com/v1/browse/new-releases?country=US&limit=20', {
                               
                    headers: headers       
                })
               setTopAlbums(response.data.albums.items)
            }
        }    
        if (token) {
          getinfo()
        }             
    }, [token])

       return (
           <div className="bg-indigo-50 h-min-screen">
               <Header
               accessToken={accessToken}
               currentSearch={currentsearch}
               />
                <div className="flex items-center justify-center mt-5 ">
              <TrendingBanner/>
            </div>
            <Container className="py-8 mx-auto px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-15 px-2">
              {topalbums.map((album) => {
                return (
                  <Link
                    key={album.id}
                     className="bg-indigo-100 border-2 border-indigo-700 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 w-full overflow-hidden"
                    to={`/album/${encodeURIComponent(album.name)}`}
                    state={{album : album, token : accessToken}}
                    >
                    <div className="relative">
                      <div className="h-64 overflow-hidden border-b-2 border-indigo-700">
                        <Card.Img
                          src={album.images[0].url}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute top-3 right-3 bg-indigo-800 text-indigo-100 text-xs px-2 py-1 font-serif">
                        {new Date(album.release_date).getFullYear()}
                      </div>
                    </div>
                    <Card.Body className="p-4">
                      <Card.Title
                        className="font-bold text-base mt-1 text-indigo-900 font-serif border-b border-indigo-300 pb-2 mb-2"
                      >
                        {album.name}
                      </Card.Title>
                      <Card.Text
                        className="text-indigo-800 text-sm"
                      >
                        <div className="font-serif font-medium mb-1">{album.artists[0].name}</div>
                        <div className="text-xs text-indigo-700 mt-2 flex items-center">
                          <span className="mr-2">Released:</span> 
                          <span className="font-mono">{album.release_date}</span>
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </Link>
                )
              })}
            </div>
          </Container>
               
          </div>
    )
}

export default HomePage