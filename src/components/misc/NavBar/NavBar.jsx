import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/profile">InstaPlant</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">  
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => `nav-link ${isActive ? 'active': ''}`}
                to="/plants"
              >
                Plants
              </NavLink>
              <NavLink
                className={({ isActive }) => `nav-link ${isActive ? 'active': ''}`}
                to="/posts"
              >
                AllPosts
              </NavLink>
              <NavLink
                className={({ isActive }) => `nav-link ${isActive ? 'active': ''}`}
                to="#"
              >
                Create a Post
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar