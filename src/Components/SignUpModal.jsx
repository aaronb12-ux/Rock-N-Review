import { Music } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
const SignUpModal = ({setBrowsing}) => {

    return (
        <div className="fixed inset-0 bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-20">
          <div className="bg-slate-200 rounded-2xl shadow-xl p-6 w-[90%] max-w-sm relative animate-fade-in ">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold transition"
              onClick={() => setBrowsing(false)}
              aria-label="Close"
            >
              ×
            </button>
      
            {/* Optional Icon */}
            <div className="flex justify-center">
            <div className="w-20 h-20 bg-slate-300 rounded-full flex items-center justify-center mb-6">
              <Music className="mr-1 text-black h-10 w-10" />
            </div>
            </div>
      
            {/* Message */}
            <p className="text-center text-lg font-semibold text-gray-800">

                <span>
  <Link className="text-slate-900"
  to={'/signup'}
  >Make an account</Link>
  <text> or </text>
  <Link className="text-slate-950"
   to={'/Login'}
  >login</Link>
  <text> to review and save albums!</text>
</span>

            </p>
          </div>
        </div>
      );
      
}


export default SignUpModal