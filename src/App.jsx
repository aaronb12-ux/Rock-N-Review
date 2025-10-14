import { useState, useEffect } from "react";
import Signup from "./Router/Signup";
import HomePage from "./Router/HomePage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [signedup, setSignedUp] = useState(false);

  useEffect(() => {

    const checkifloggedin = async () => {

      const auth = getAuth()
      
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('user is signed in:', user.uid)
          setSignedUp(true)
        } else {
          console.log('no user signed in')
        }
      })
    }

    checkifloggedin()
  },  [])

  console.log('we are here')
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
