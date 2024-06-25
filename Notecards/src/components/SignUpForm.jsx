import { useState } from "react"
import { newLogin } from "../utils/user";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const alertMsg = "Username already exists";
  const navigate = useNavigate();

  const attemptSignUp = async () => {
    const isSignedUp = await newLogin(username, password);
    if (isSignedUp) {
      console.log("success!")
      navigate('/');  // redirection to home page
    } else {
      console.log("username already exists")
      setAlert(true);     // enables alert message for user
    }
  }

  const handleSumbit = async (e) => {
    console.log("Handling submit")
    e.preventDefault();
    await attemptSignUp()
  }

  return (
    <form onSubmit={handleSumbit}>
      {alert && <h1>{alertMsg}</h1>}
      <label>
        username:
        <br />
        <input
          type="text"
          value={username}
          name="username"
          onChange={(e) => setUsername(e.target.value) }
          required
        />
      </label>
      <br />
      <label>
        password:
        <br />
        <input 
          type="password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Sign Up</button>
    </form>
  )
}

export default SignUpForm