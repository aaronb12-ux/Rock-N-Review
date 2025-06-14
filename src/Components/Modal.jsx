import ReviewForm from "./ReviewForm"
const Modal = ({setModal, album, only_tracks, setRefresh, editreview}) => {

   const post_data = {
    albumid: album.albumid || album.id,
    name: album.name,
    artist: album.artist || album.artists[0].name,
    release_date: album.release_date,
    image: album.image || album.images[0].url ,
    tracks: only_tracks,
    created: new Date()

   }

    const handlemodal = () => {
        setModal(modal => !modal)
        editreview.being_edited = false
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      {/* Modal Container with proper height constraints */}
      <div className="w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Modal Content */}
      
          
    
          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto p-2">
            <ReviewForm
              postdata={post_data}
              setModal={setModal}
              setRefresh={setRefresh}
              editreview={editreview}            
            />
          </div>
      </div>
    
   
    </div>
    )
}

export default Modal