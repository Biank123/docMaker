import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Menú de hamburguesa en móvil */}
      <button className="hamburger-menu" onClick={toggleMobileMenu}>
        ☰
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isMobileMenuOpen ? "open" : ""}`}>
        <h2>☰</h2>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/documentar">Documentar</Link></li>
          <li><Link to="/diagramas">Diagramas</Link></li>
          <li><Link to="/informacion">Información</Link></li>
          <li><Link to="/estadisticas">Estadísticas</Link></li>
          <li><Link to="/diccionario">Diccionario</Link></li>
          <li><Link to="/comparativa">Comparativa</Link></li>
          <li><Link to="/checklist">Checklist</Link></li>
          <li><Link to="/ayuda">Ayuda</Link></li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;

