import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import { DndProvider } from 'react-dnd'; // Importa el DndProvider
import { HTML5Backend } from 'react-dnd-html5-backend';

// Importa las páginas
import Documentar from "./pages/Documentar";
import Diagramas from "./pages/Diagramas";
import Informacion from "./pages/Informacion";
import Estadisticas from "./pages/Estadisticas";
import Diccionario from "./pages/Diccionario";
import Comparativa from "./pages/Comparativa";
import Checklist from "./pages/Checklist";
import Ayuda from "./pages/Ayuda";
import Inicio from './pages/Inicio';

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/documentar" element={<Documentar />} />
            <Route path="/diagramas" element={<Diagramas />} />
            <Route path="/informacion" element={<Informacion />} />
            <Route path="/estadisticas" element={<Estadisticas />} />
            <Route path="/diccionario" element={<Diccionario />} />
            <Route path="/comparativa" element={<Comparativa />} />
            <Route path="/checklist" element={<Checklist />} />
            <Route path="/ayuda" element={<Ayuda />} />
          </Routes>
        </div>
      </Router>
    </DndProvider>
  );
};

export default App;

