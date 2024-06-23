import { Link } from "react-router-dom"
import '../styles/Navbar.css'
const Navbar = () => {

  return (
    <>
      <nav>
        <ul className="navbar-links">
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/notecards'>Notecards</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/create'>Create</Link></li>
        </ul>
      </nav>
    </>
  )

}

export default Navbar;