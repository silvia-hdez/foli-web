import { Link, NavLink } from 'react-router-dom';
import './NavBar.css'


const Navbar = () => {
  return (
    <nav className="NavBar">
      <div>
        <ul >  
          <li >
              <NavLink style={{textDecoration:'none', color:'white'}}  to="/plants">
              <i className="bi bi-flower1"></i>
              </NavLink>
              </li>
          <li >
              <NavLink style={{textDecoration:'none', color:'white'}}  to="/posts">
                <i className="bi bi-binoculars-fill"></i>
              </NavLink>
              </li>
            <li >
              <NavLink style={{textDecoration:'none', color:'white'}} to="/new">
              <i className="bi bi-patch-plus"></i>
              </NavLink>
              </li>
              <li >
              <NavLink style={{textDecoration:'none', color:'white'}}  to="/profile">
              <i className="bi bi-person-circle"></i>
              </NavLink>
            </li>
          </ul>
       
      </div>
    </nav>
  )
}

export default Navbar