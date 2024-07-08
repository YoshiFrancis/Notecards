import { useNavigate } from "react-router-dom"
import { getUsername, logoff } from "../utils/user"

const SignOutForm = () => {
  const navigate = useNavigate()
  if (getUsername() == "")
    navigate("/");

  const signOut = () => {
    logoff();
    navigate("/")
  }

  return (
    <div>
      <h1>Do you want to signout {getUsername()}?</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}

export default SignOutForm;