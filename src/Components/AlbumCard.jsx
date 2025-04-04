import  axios  from "axios";
import React from "react";
import AlbumOptions from "./AlbumOptions";

function AlbumCard({ albumimage, albumdata, albumtracks, saved}) {


    const formatReleaseDate = (dateString) => { //function to format the date
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const only_tracks = albumtracks.map(album => album.name) //creating a new array with the given 'albumtracks'

    return (
      <div className="p-4" >
        <div className="rounded-lg overflow-hidden bg-gradient-to-br from-amber-400 to-amber-200 shadow-xl" >
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
                {formatReleaseDate(albumdata.release_date)}
              </span>
            </div>
            <div>
              <AlbumOptions
              albumdata={albumdata}
              only_tracks={only_tracks}
              saved={saved}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default AlbumCard;


