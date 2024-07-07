import { Link } from "react-router-dom"
import '../styles/Navbar.css'
import { getUsername } from "../utils/user"
const Navbar = () => {

  return (
    <>
      <nav>
        <ul className="navbar-links">
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/notecards'>Notecards</Link></li>
          {getUsername() == "" && <li><Link to='/login'>Login</Link></li>}
          {getUsername() == "" && <li><Link to='/login/new'>Sign Up</Link></li>}
          {getUsername() && <li><Link to={`/notecards/${getUsername()}/create`}>Create</Link></li>}
          {getUsername() && <li><Link to='/'>Sign Out</Link></li>}
        </ul>
      </nav>
    </>
  )

}

export default Navbar;