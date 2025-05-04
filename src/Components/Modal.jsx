import ReviewForm from "./ReviewForm"
const Modal = ({setModal, album, only_tracks, setRefresh, edit}) => {

  let post_data

   if (album.artist) { //if we are tying to review an already 'saved' album from the database. fields are different.
      post_data = {
        albumid: album.albumid,
        name: album.name,
        artist: album.artist,
        release_date: album.release_date,
        image: album.image,
        tracks: only_tracks,
        created: new Date()
      }
   } else {
    post_data = { //from search
      albumid: album.id,
      name: album.name,
      artist: album.artists[0].name,
      release_date: album.release_date,
      image: album.images[0].url,
      tracks: only_tracks,
      created: new Date()
  } 
   }

    const handlemodal = () => {
        setModal(modal => !modal)
        edit[0] = false
    }

    return (
        <div>
            <div className="fixed inset-0  bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-5"> {/*Modal*/}
              <div className="w-[600px] flex flex-col"> {/*Content*/}
                <button className="text-white text-xl place-self-end cursor-pointer"
                onClick={handlemodal}
                >
                  x
                </button>
                <div className="bg-indigo-50 p-2 rounded-lg">
                  {/* Review Form Inside the Modal */}
                  <ReviewForm
                  postdata={post_data}
                  setModal={setModal}
                  setRefresh={setRefresh}
                  edit={edit}
                  />
                  </div>
                </div>
              </div>
        </div>
    )
}

export default Modal