import { StrictMode, useLayoutEffect } from 'react'

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider, Link, Outlet, useLocation} from "react-router-dom"
import SearchResults from './Router/SearchResults.jsx'
import Album from './Router/Album.jsx'
import Saved from './Router/Saved.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "search",
    element: <SearchResults/>
  },
  {
    path: "album/:albumname",
    element: <Album/>
  }, 
  {
    path: "saved",
    element: <Saved/>
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

