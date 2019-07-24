import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar bg-main">
      <h1>
        <i className="fas fa-puzzle-piece" /> Polyglot
      </h1>
      <ul>
        <li>
          <NavLink to="/auth/register" activeClassName="navbar-active">
            Sign up
          </NavLink>
        </li>
        <li>
          <NavLink to="/auth/login" activeClassName="navbar-active">
            Login <i className="fas fa-sign-in-alt" />
          </NavLink>
        </li>
        <li>|</li>
        <li>
          <NavLink to="/posts" activeClassName="navbar-active">
            Posts
          </NavLink>
        </li>
        <li>
          <i className="fas fa-door-open" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
