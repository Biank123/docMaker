import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const dictionaryData = [
    { term: "ACF", definition: "Advanced Custom Fields: un plugin de WordPress para campos personalizados." },
    { term: "API", definition: "Application Programming Interface: conjunto de reglas y definiciones para interactuar con un sistema." },
    { term: "CMS", definition: "Content Management System: sistema de gestión de contenidos, como WordPress, Drupal, etc." },
    { term: "SEO", definition: "Search Engine Optimization: práctica de mejorar la visibilidad de un sitio web en los motores de búsqueda." },

];

const DictionaryPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredDictionary = dictionaryData.filter((entry) =>
        entry.term.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Diccionario de Palabras Técnicas</h1>

            {/* Barra de búsqueda */}
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar término..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Lista de términos filtrados */}
            <div className="list-group">
                {filteredDictionary.length > 0 ? (
                    filteredDictionary.map((entry, index) => (
                        <div key={index} className="list-group-item list-group-item-action">
                            <h5>{entry.term}</h5>
                            <p>{entry.definition}</p>
                        </div>
                    ))
                ) : (
                    <div className="alert alert-info">No se encontraron términos.</div>
                )}
            </div>
        </div>
    );
};

export default DictionaryPage;
