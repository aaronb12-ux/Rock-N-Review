import  axios  from "axios";
import React from "react";

function AlbumCard({ albumimage, albumdata, albumtracks }) {

    const formatReleaseDate = (dateString) => { //function to format the date
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const only_tracks = albumtracks.map(album => album.name) //creating a new array with the given 'albumtracks'

    const handlesave = async (e) => {
         e.preventDefault()

         const POST_DATA = { //Data to be sent via the post request when saving the album 
          name: albumdata.name,
          artist: albumdata.artists[0].name,
          genre: '',
          released: albumdata.release_date,
          image: albumdata.images[0].url,
          tracks: only_tracks,
          saved: true
         
        }
          axios.post("http://localhost:8080/albums", POST_DATA).then(response => {console.log(response.data)}) //POST request via Axios
         .catch(error => {console.log(error);});    
    }
  
    return (
      <div className="p-4" >
        <div className="rounded-lg overflow-hidden bg-gradient-to-br from-amber-100 to-amber-200 shadow-xl" >
          <div className="relative" >
            <img 
              src={albumimage} 
              width={400} 
              height={400} 
              className="object-cover"
              alt={albumdata.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <div className="p-6">
            <h2 className="text-2xl font-bold text-amber-900 mb-2">
              {albumdata.name}
            </h2>
            <h3 className="text-lg font-medium text-amber-700 mb-3">
              {albumdata.artist}
            </h3>
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-amber-600">
                {formatReleaseDate(albumdata.released)}
              </span>
            </div>
            
    
            <div className="mt-6 flex space-x-3">
              <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-md transition flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Play
              </button>
              <button className="flex items-center justify-center p-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-md transition"
              onClick={handlesave}
              >
                
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" >
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
                </svg>
              </button>
              <button className="flex items-center justify-center p-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-md transition">
                
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default AlbumCard;


