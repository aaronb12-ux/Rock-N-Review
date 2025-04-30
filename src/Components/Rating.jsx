import { useEffect, useState } from "react";

const Rating = ({ reviews }) => {
  const [colors, setColors] = useState(["text-gray-400", "text-gray-400", "text-gray-400", "text-gray-400", "text-gray-400"]);
  const [averageRating, setAverageRating] = useState(0);
  
  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const stars_only = reviews.map((review) => review[1]);
      const calcAverage = getAverageRating(stars_only);
      setAverageRating(calcAverage);
      handleRating(calcAverage);
    }
  }, [reviews]);
  
  function getAverageRating(stars) {
    let sum = 0;
    for (const star of stars) {
      sum += star;
    }
    return sum / stars.length;
  }
  
  function handleRating(average_rating) {
    const decimal = average_rating % 1;
    if (decimal < 0.50) {
      average_rating = Math.floor(average_rating);
    } else {
      average_rating = Math.ceil(average_rating);
    }
    handleColors(average_rating);
  }
  
  function handleColors(average_rating) {
    switch (average_rating) {
      case 1:
        setColors(["text-yellow-400", "text-gray-400", "text-gray-400", "text-gray-400", "text-gray-400"]);
        break;
      case 2:
        setColors(["text-yellow-400", "text-yellow-400", "text-gray-400", "text-gray-400", "text-gray-400"]);
        break;
      case 3:
        setColors(["text-yellow-400", "text-yellow-400", "text-yellow-400", "text-gray-400", "text-gray-400"]);
        break;
      case 4:
        setColors(["text-yellow-400", "text-yellow-400", "text-yellow-400", "text-yellow-400", "text-gray-400"]);
        break;
      case 5:
        setColors(["text-yellow-400", "text-yellow-400", "text-yellow-400", "text-yellow-400", "text-yellow-400"]);
        break;
      default:
        setColors(["text-gray-400", "text-gray-400", "text-gray-400", "text-gray-400", "text-gray-400"]);
    }
  }
  
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-sm uppercase tracking-wider font-semibold text-white mb-2.5">
      Average Rating
    </h3>
      <div className="flex justify-center items-center mb-1">
        {colors.map((color, index) => (
          <span 
            key={index} 
            className={`${color} text-3xl mx-0.5 transform transition-all duration-300 hover:scale-110`}
            style={{ textShadow: color.includes('yellow') ? '0 0 5px rgba(251, 191, 36, 0.5)' : 'none' }}
          >
            &#9733;
          </span>
        ))}
      </div>
      <p className="text-sm font-medium text-gray-600">
        {averageRating.toFixed(1)} out of 5
      </p>
    </div>
  );
};

export default Rating;