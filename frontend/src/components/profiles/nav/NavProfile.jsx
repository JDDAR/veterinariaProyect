import React from "react";
import { Link } from "react-router-dom";

const NavProfile = ({ links }) => {
  return (
    <nav className="navProfile">
      <ul>
        {links.map((link) => (
          <li key={link.path}>
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavProfile;
