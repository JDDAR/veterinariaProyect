import React from "react";
import { NavLink } from "react-router-dom";
import logoHeader from "../../img/logo-dark.png";

const HeaderNav = ({ nombre }) => {
  return (
    <>
      <div className="containerHeader">
        <div className="container HeaderNav">
          <figure className="HeaderNav__logoContainer">
            <NavLink to="/" /> <img src={logoHeader} alt="Logo" /> <NavLink />
          </figure>
          <nav className="HeaderNav__navcontent">
            <ul>
              <li>Nosotros </li>
              <li>mas</li>
            </ul>
          </nav>
          <div className="HeaderNav__buttonHeader">
            <button className="buton-primary"> Iniciar sesión</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderNav;
