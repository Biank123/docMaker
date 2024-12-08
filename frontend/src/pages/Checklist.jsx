import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './styleButtons.css';

const practices = [
    {
        category: "Buenas Prácticas Generales",
        items: [
            { id: 1, practice: "Documentar el código", completed: false },
            { id: 2, practice: "Comentar el código de manera adecuada", completed: false },
            { id: 3, practice: "Usar control de versiones (Git)", completed: false },
            { id: 4, practice: "Evitar código redundante", completed: false },
        ],
    },
    {
        category: "Buenas Prácticas para WordPress",
        items: [
            { id: 5, practice: "Usar hooks y filtros correctamente", completed: false },
            { id: 6, practice: "Evitar modificar archivos core de WordPress", completed: false },
            { id: 7, practice: "Optimizar la base de datos", completed: false },
            { id: 8, practice: "Utilizar child themes para personalización", completed: false },
        ],
    },
    {
        category: "Buenas Prácticas para Otros CMS",
        items: [
            { id: 9, practice: "Seguir las guías de desarrollo del CMS", completed: false },
            { id: 10, practice: "Mantener los CMS actualizados", completed: false },
            { id: 11, practice: "Configurar adecuadamente las herramientas de SEO", completed: false },
        ],
    },
];

const ChecklistPage = () => {
    const [practicesState, setPracticesState] = useState(practices);

    const handleCheckboxChange = (categoryIndex, itemIndex) => {
        const updatedPractices = [...practicesState];
        updatedPractices[categoryIndex].items[itemIndex].completed =
            !updatedPractices[categoryIndex].items[itemIndex].completed;
        setPracticesState(updatedPractices);
    };

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Checklist de Buenas Prácticas</h1>

            {practicesState.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-4">
                    <h4>{category.category}</h4>
                    <div className="list-group">
                        {category.items.map((item, itemIndex) => (
                            <div key={item.id} className="list-group-item d-flex align-items-center">
                                <input
                                    type="checkbox"
                                    checked={item.completed}
                                    onChange={() => handleCheckboxChange(categoryIndex, itemIndex)}
                                    className="form-check-input me-2"
                                />
                                <span>{item.practice}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <div className="text-center">
                {/* <button className="btn btn-primary">Guardar Progreso</button> */}
                <button className="btn btn-success ms-3 btn-purple btn-hover" >Exportar Checklist</button>
            </div>
        </div>
    );
};

export default ChecklistPage;
