import React from "react";
import AlbumOptions from "./AlbumOptions";

function AlbumCard({ albumimage, albumdata, saved, only_tracks, setModal, modal }) {
  const formatReleaseDate = (dateString) => {
    return new Date(dateString).getFullYear(); // Just show the year to save space
  };
  
  return (
    <div className="p-2">
      <div className="rounded overflow-hidden bg-white shadow-sm hover:shadow border border-indigo-50 flex flex-col w-full max-w-xs ">
        <div className="w-full">
          <img
            className="w-full object-cover"
            src={albumimage}
            alt={albumdata.name}
          />
        </div>
        
        <div className="p-2.5 bg-white">
          <h2 className="text-sm font-bold text-indigo-900 truncate" title={albumdata.name}>
            {albumdata.name}
          </h2>
          <h3 className="text-xs font-medium text-indigo-700 truncate mb-1" title={albumdata.artist}>
            {albumdata.artist}
          </h3>
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-indigo-500">
              {formatReleaseDate(albumdata.release_date)}
            </span>
            
            <AlbumOptions
              albumdata={albumdata}
              saved={saved}
              only_tracks={only_tracks}
              setModal={setModal}
              modal={modal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumCard;