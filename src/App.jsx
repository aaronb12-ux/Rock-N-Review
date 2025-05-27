import { useState} from 'react';
import Signup from './Router/Signup';
import HomePage from './Router/HomePage'



function App() {

<<<<<<< HEAD
  const [signedup, setSignedUp] = useState(false);
=======
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
      async function getaccesstoken() {
      
          const response = await Axios.post("https://accounts.spotify.com/api/token", {
              grant_type: "client_credentials",
              client_id : "client_id",
              client_secret : "client_secret",
              }, {
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                  }
              }
          )
          setAccessToken(response.data.access_token)
          window.localStorage.setItem('ACCESS_TOKEN', response.data.access_token)
      }
      getaccesstoken()
  },[]) //get the access token initially

>>>>>>> 1b0b083a6e1e79e6cfa3dedfb18dabba32dc00b8

  return (
    <div>
      {signedup === false ? (
        <Signup
          setSignedUp={setSignedUp}
        />
      ) : (
        <div>
          <HomePage
          />
        </div>
      )}
    </div>
  );
}

export default App;

