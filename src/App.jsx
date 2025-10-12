import { useState, useEffect } from "react";
import Signup from "./Router/Signup";
import HomePage from "./Router/HomePage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [signedup, setSignedUp] = useState(false);

  //need to check if current session: if not go to homepage



  return (
    <div>
      {signedup === false ? ( //when user is signed up, go to homepage if not continue at signup page
      <HomePage/>
        //<Signup setSignedUp={setSignedUp} />
      ) : (
        <div>
          <HomePage />
        </div>
      )}
    </div>
  );
}

export default App;
