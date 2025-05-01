import Header from "../Components/Header";
import { useState, useEffect } from "react";
import axios from "axios"
import { Link, useLocation} from 'react-router-dom';
import {
    Container,
    Card,
} from "react-bootstrap"
import SavedBanner from "../Components/SavedBanner";

function Saved() {
    //this page when navigated to, will send a get request to the api and fetch all the saved albums, then display them.

    const location = useLocation()
    const currentsearch = location.state?.searchInput


    const [albums, setAlbums] = useState([]) //state that will store all the saved albums

    useEffect(() => {  //useEffect hook ran on initial page rendering
        async function getSavedAlbums() {
          const response = await axios.get("http://localhost:8080/saved-albums") //get request from api
          setAlbums(response.data)
        }
        getSavedAlbums()
    }, [])

  
    if (albums === null) {
      return (<div className="bg-indigo-50 min-h-screen">
            <Header
             currentSearch={currentsearch}
            />
            <div className="flex items-center justify-center mt-5 ">
            <SavedBanner/>
            </div>
      </div>)
    }


    return (
        <div className="bg-indigo-50 min-h-screen">
            <Header
             currentSearch={currentsearch}
            />
            <div className="flex items-center justify-center mt-5 ">
            <SavedBanner/>
            </div>
            <Container className="py-8 mx-auto px-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 px-4">
              {albums.map((album) => {
                return (
                  <Link
                    key={album.id}
                    className="bg-indigo-100 m-6 rounded-none border-2 border-indigo-700 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 max-w-xs overflow-hidden"
                    to={`/saved/${encodeURIComponent(album.name)}`}
                    state={{album: album, saved: true}}
                    >
                    <div className="relative">
                      <div className="h-64 overflow-hidden border-b-2 border-indigo-700">
                        <Card.Img
                          src={album.image}
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
                        <div  className="font-serif font-medium mb-1">{album.artist}</div>
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


export default Saved



   