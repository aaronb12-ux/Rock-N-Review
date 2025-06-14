import { Music } from "lucide-react";
const DuplicateModal = ({setDuplicateReview}) => {

    return (
        <div className="fixed inset-0 bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-sm relative animate-fade-in">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold transition"
              onClick={() => setDuplicateReview(false)}
              aria-label="Close"
            >
              ×
            </button>
      
            {/* Optional Icon */}
            <div className="flex justify-center">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
              <Music className="mr-1 text-indigo-700 h-10 w-10" />
            </div>
            </div>
      
            {/* Message */}
            <p className="text-center text-lg font-semibold text-gray-800">
              You've already reviewed this album.
            </p>
          </div>
        </div>
      );
      
}


export default DuplicateModal
