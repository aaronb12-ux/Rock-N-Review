const DuplicateModal = ({setDuplicateReview}) => {

    return (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
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
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01M5.07 19H18.9a1.77 1.77 0 001.77-1.77V6.77A1.77 1.77 0 0018.9 5H5.07A1.77 1.77 0 003.3 6.77v10.46A1.77 1.77 0 005.07 19z"
                />
              </svg>
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
