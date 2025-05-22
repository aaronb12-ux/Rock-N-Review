import axios from "axios"
import { createUserWithEmailAndPassword} from 'firebase/auth'

const duplicateUserName =  async (username) => { //function checks if username already exists
    try {
      const response = await axios.get(`http://localhost:8080/users/username/${username}`);  
        return response.status === 200;
    } catch (err) {
        if (err.response && err.response.status === 404) { return false }
            throw err
    }
}

export const submitUser = async (username, email, password, auth) => { //function checks for dup username and valid fields, then creates the user

    if (password.length < 8) return { error: "badPassword" }

    const isDuplicate = await duplicateUserName(username)
    if (isDuplicate) return { error: "duplicateUsername"}

    try {

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid

      axios.post(`http://localhost:8080/users`, {
        userid: uid,
        email: email,
        username: username,
        created: new Date(),
      })
      
        return { success: true};
      
    } catch (error) {
      if (error.code === "auth/email-already-in-use") return { error: "duplicateEmail" }
      if (error.code === "auth/invalid-email") return { error: "badEmail" }
        return { error: "unknown" }
    }
}

