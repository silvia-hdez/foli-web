import { Link, NavLink } from 'react-router-dom';
import './NavBar.css'


const Navbar = () => {
  return (
    <nav className="NavBar">
      <div>
        <ul >  
          <li >
              <NavLink style={{textDecoration:'none', color:'white'}}  to="/plants">
              <i className="bi bi-flower1"></i><p className='TextNav'>Cards</p>
              </NavLink>
              </li>
          <li >
              <NavLink style={{textDecoration:'none', color:'white'}}  to="/posts">
                <i className="bi bi-binoculars-fill"></i><p className='TextNav'>Explore</p>
              </NavLink>
              </li>
            <li >
              <NavLink style={{textDecoration:'none', color:'white'}} to="/new">
              <i className="bi bi-patch-plus"></i><p className='TextNav'>Create</p>
              </NavLink>
              </li>
              <li >
              <NavLink reloadDocument style={{textDecoration:'none', color:'white'}}  to="/profile">
              <i className="bi bi-person-circle"></i> <p className='TextNav'>Profile</p>
              </NavLink>
            </li>
          </ul>
       
      </div>
    </nav>
  )
}

export default Navbar