import Header from "../Components/Header";
import { useState, useEffect } from "react";
import axios from "axios"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Container,
    Row,
    Card,
} from "react-bootstrap"

function Saved() {
    //this page when navigated to, will send a get request to the api and fetch all the saved albums, then display them.

    const location = useLocation()
    const [currentsearch, setCurrentSearch] = useState(location.state?.searchInput)


    const [albums, setAlbums] = useState([]) //state that will store all the saved albums

    useEffect(() => {  //useEffect hook ran on initial page rendering
        async function getSavedAlbums() {
          const response = await axios.get("http://localhost:8080/albums") //get request from api
          setAlbums(response.data)
        }
        getSavedAlbums()
    }, [])



    return (
        <div className="bg-amber-50 min-h-screen">
            <Header
             currentSearch={currentsearch}
            />
            <div className="flex items-center justify-center mt-5 ">
            <span className="relative inline-block">
        <span className="absolute inset-0 bg-amber-800 opacity-10 transform rotate-1"></span>
        <span className="relative z-10 text-3xl font-bold font-serif text-amber-800 tracking-widest drop-shadow-md px-8 py-3 border-x-4 border-amber-700 flex items-center">
          <svg className="w-6 h-6 mr-3 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
          <span className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700 bg-clip-text text-transparent">Saved</span>
          <svg className="w-6 h-6 ml-3 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
        </span>
        <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-700 to-transparent"></span>
      </span>
            </div>
            <Container className="py-8">
            <Row className="flex flex-row flex-wrap justify-around content-start">
              {albums.map((album) => {
                return (
                  <Link
                    key={album.id}
                    className="bg-amber-100 m-6 rounded-none border-2 border-amber-700 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 max-w-xs overflow-hidden"
                    to={`/saved/${encodeURIComponent(album.name)}`}
                    state={{album: album}}
                    >
                    <div className="relative">
                      <div className="h-64 overflow-hidden border-b-2 border-amber-700">
                        <Card.Img
                          src={album.image}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute top-3 right-3 bg-amber-800 text-amber-100 text-xs px-2 py-1 font-serif">
                        {new Date(album.released).getFullYear()}
                      </div>
                    </div>
                    <Card.Body className="p-4">
                      <Card.Title
                        className="font-bold text-base mt-1 text-amber-900 font-serif border-b border-amber-300 pb-2 mb-2"
                      >
                        {album.name}
                      </Card.Title>
                      <Card.Text
                        className="text-amber-800 text-sm"
                      >
                        <div  className="font-serif font-medium mb-1">{album.artist}</div>
                        <div className="text-xs text-amber-700 mt-2 flex items-center">
                          <span className="mr-2">Released:</span> 
                          <span className="font-mono">{album.released}</span>
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </Link>
                )
              })}
            </Row>
          </Container>
        </div>
    )
}


export default Saved



   