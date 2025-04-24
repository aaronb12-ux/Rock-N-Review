
    //This is the review card.
    //It is a card that lists the review, the date made, the rating, and the user
    const Review = ({ author, rating, date, text}) => {
        
        date = date.slice(0,10)

        return (
          <div className="box-border p-4 bg-white rounded-lg shadow-md border border-gray-200 mb-4 w-full">
            <div className="flex items-center mb-3">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-5 h-5 fill-current ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">{rating}.0</span>
            </div>
            
            <p className="text-gray-700">{text}</p>
            
            <div className="mt-3 flex justify-between items-center">
              <span className="text-xs text-gray-500">Posted by {author}</span>
              <span className="text-xs text-gray-500">{date}</span>
            </div>
          </div>
        );
      };
    

export default Review