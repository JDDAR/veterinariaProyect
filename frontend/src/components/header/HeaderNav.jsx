import React from "react";
import logoHeader from "../../img/logo-dark.png";

const HeaderNav = ({ nombre }) => {
  return (
    <>
      <div className="containerHeader">
        <div className="container HeaderNav">
          <figure className="HeaderNav__logoContainer">
            <img src={logoHeader} alt="Logo" />
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
