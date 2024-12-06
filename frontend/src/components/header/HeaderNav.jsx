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
            <NavLink to="/">Clauw Guardians</NavLink>
          </figure>
          <nav className="HeaderNav__navcontent">
            <ul>
              <li>Nosotros</li>
              <li></li>
            </ul>
          </nav>
          <div className="HeaderNav__buttonHeader">
            <NavLink to="/login" className="buton-primary">
              Iniciar sesión
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderNav;
