import { useState } from "react"
import { newLogin } from "../utils/user";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const attemptSignUp = async () => {
    const isSignedUp = await newLogin(username, password);
    if (isSignedUp) {
      console.log("success!")
      // redirect to home page again
    } else {
      console.log("username already exists")
      // clear form and alert user such
    }
  }

  const handleSumbit = async (e) => {
    console.log("Handling submit")
    e.preventDefault();
    await attemptSignUp()
  }

  return (
    <form onSubmit={handleSumbit}>
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