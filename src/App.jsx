import { useState, useEffect } from 'react';
import Axios from "axios";
import Signup from './Router/Signup';
import HomePage from './Router/HomePage';



function App() {
  const [accessToken, setAccessToken] = useState("");
  const [signedup, setSignedUp] = useState(false);
  
  useEffect(() => {
    async function getaccesstoken() {
      const response = await Axios.post("https://accounts.spotify.com/api/token", {
        grant_type: "client_credentials",
        client_id: "4f66a504879940299bd15c5457e424b2",
        client_secret: "055aee7a8d8a4fa188c2bfa52ff76177",
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      setAccessToken(response.data.access_token);
      window.localStorage.setItem('ACCESS_TOKEN', response.data.access_token);
    }
    getaccesstoken();
  },[]);
  
  return (
    <div>
    
      {signedup === false ? (
        <Signup
          setSignedUp={setSignedUp}
        />
      ) : (
        <div>
          <HomePage
            accessToken={accessToken}
          />
        </div>
      )}
    </div>
  );
}

export default App;

/*


*/