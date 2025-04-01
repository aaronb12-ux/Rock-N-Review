import { StrictMode} from 'react'

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import SearchResults from './Router/SearchResults.jsx'
import Album from './Router/Album.jsx'
import Saved from './Router/Saved.jsx'


const router = createBrowserRouter([
  {
    path: "/",  //home page
    element: <App/> 
  },
  {
    path: "search", //search results
    element: <SearchResults/>
  },
  {
    path: "album/:albumname", //specific album
    element: <Album/>
  }, 
  {
    path: "saved", //user saved albums
    element: <Saved/>
  },
  {
    path: "saved/:albumname", //specific saved album
    element: <SavedAlbum/>
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

