import React from "react";
import AlbumOptions from "./AlbumOptions";

function AlbumCard({ albumimage, albumdata, only_tracks, setModal, modal, setDuplicateReview}) {
  const formatReleaseDate = (dateString) => {
    return new Date(dateString).getFullYear(); // Just show the year to save space
  };

  
  return (
    <div className="h-full w-full ">
      <div  className="rounded overflow-hidden bg-slate-950 shadow-sm hover:shadow border border-slate-800 flex flex-col h-auto max-w-sm mx-auto">
        <div className="relative pt-[100%] w-full">
          <img
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={albumimage}
            alt={albumdata.name}
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-lg font-bold text-white " >
            {albumdata.name}
          </h2>
          <h3 className="text-sm font-medium text-slate-400 truncate mb-2">
            {albumdata.artist}
          </h3>
          <div className="mt-auto flex justify-between items-center">
            <span className="text-xs text-slate-500">
              {formatReleaseDate(albumdata.release_date)}
            </span>
            <AlbumOptions
              albumdata={albumdata}
              only_tracks={only_tracks}
              setModal={setModal}
              modal={modal}
              setDuplicateReview={setDuplicateReview}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumCard;