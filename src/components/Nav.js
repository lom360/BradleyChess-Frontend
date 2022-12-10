import { Outlet, Link, NavLink } from "react-router-dom";

const Nav = () => {
  return (<>
    <div className="container">
      <nav>
        <ul>
          <li>
            {/* <Link to="/">Home</Link> */}
            <NavLink
                to="/"
                style={({ isActive }) => 
                    (isActive ? {color: '#B58863'} : {color: '#383635'})}>
                Home
            </NavLink>
          </li>
          <li>
          <NavLink
                to="/visualization"
                style={({ isActive }) => 
                    (isActive ? {color: '#B58863'} : {color: '#383635'})}>
                Visualization
            </NavLink>
          </li>
          <li>
          <NavLink
                to="/streams"
                style={({ isActive }) => 
                    (isActive ? {color: '#B58863'} : {color: '#383635'})}>
                Streams
            </NavLink>
          </li>
          <li>
          <NavLink
                to="/about"
                style={({ isActive }) => 
                    (isActive ? {color: '#B58863'} : {color: '#383635'})}>
                About
            </NavLink>
          </li>
        </ul>
      </nav>

    </div>
    <Outlet /></>
  )
};

export default Nav;