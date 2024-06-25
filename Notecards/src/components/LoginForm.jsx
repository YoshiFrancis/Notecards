import React, { useState } from "react"
import { login } from "../utils/user";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const alertMsg = "Incorrect username or password";
  const navigate = useNavigate();

  const attemptSignUp = async () => {
    const isLoggedIn = await login(username, password);
    if (isLoggedIn) {
      console.log("success!")
      navigate('/');  // redirection to home page
    } else {
      console.log(alertMsg)
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
      {alert && <h1 style={{color: 'red'}}>{alertMsg}</h1>}
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

export default LoginForm;