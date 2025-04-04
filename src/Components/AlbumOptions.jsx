import axios from "axios"

function AlbumOptions({albumdata, only_tracks, saved}) {
    
    

    const handlesave = async (e) => {
        e.preventDefault()

        
        const POST_DATA = { //Data to be sent via the post request when saving the album 
         name: albumdata.name,
         artist: albumdata.artists[0].name,
         genre: '',
         release_date: albumdata.release_date,
         image: albumdata.images[0].url,
         tracks: only_tracks,
         saved: true
        
       }

       console.log(POST_DATA)
         axios.post("http://localhost:8080/albums", POST_DATA).then(response => {console.log(response.data)}) //POST request via Axios
        .catch(error => {console.log(error);});    
   }

   const deletesave = async (e) => {
       
   }

    return (
         <div className="mt-6 flex space-x-3">
                <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-md transition flex items-center justify-center cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Play
              </button>

              { saved ? ( 
                  <button className="flex items-center justify-center p-2 bg-amber-200 hover:bg-amber-200 text-amber-700 rounded-md transition cursor-pointer"
                  onClick={deletesave}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" >
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
                    </svg>
                  </button>
              ) : (
                    <button className="flex items-center justify-center p-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-md transition cursor-pointer"
                      onClick={handlesave}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" >
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
                    </svg>
              </button>
              )}

              <button className="flex items-center justify-center p-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-md transition">
                
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
        </div>
    )
}

export default AlbumOptions