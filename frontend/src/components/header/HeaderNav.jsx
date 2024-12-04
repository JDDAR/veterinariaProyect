import React from "react";

const HeaderNav = ({ nombre }) => {
  return (
    <>
      <div className="containerHeader">
        <div className="container HeaderNav">
          <p>Logo</p>
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
