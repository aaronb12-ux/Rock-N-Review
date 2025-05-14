import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchResults from './Router/SearchResults.jsx';
import Album from './Router/Album.jsx';
import Saved from './Router/Saved.jsx';
import Reviewed from './Router/Reviewed.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Router/HomePage.jsx';
import { AuthProvider } from './Context/Context.jsx';
import Login from './Router/Login.jsx';


const router = createBrowserRouter([
  
  {
    path: "/", //home page
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
    element: <Album/>
  },
  {
    path: "reviewed", //reviewed page for albums
    element: <Reviewed/>
  },
  {
    path: "reviewed/:albumname", //reviewing an album
    element: <Album/>
  },
  {
    path: "/Homepage",
    element: <HomePage/>
  },
  {
    path: "/Login",
    element: <Login/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>
);