import axios from "axios"


const duplicateUserName =  async (username) => { 
    try {
      const response = await axios.get(`http://localhost:8080/users/username/${username}`);
       if (response.status === 200) {
        return true
      } 
    } catch (err) {
        if (err.response && err.response.status === 404) {
          console.log("user not found")
          return false
        }
    }
}

