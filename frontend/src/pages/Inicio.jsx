import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Inicio.css";

const images = [
    {
        url: "https://ayudawp.com/wp-content/uploads/2021/07/snippet-codigo-wordpress.jpg",
        text: "Tu herramienta para crear documentación técnica de forma rápida y sencilla.",
    },
    {
        url: "https://www.tecleayteclea.com/wp-content/uploads/sites/5/2020/07/Mejores-editores-de-c%C3%B3digo-PHP.jpg",
        text: "Organiza, genera y comparte documentos con tu equipo sin complicaciones.",
    },
    {
        url: "https://ayudawp.com/wp-content/uploads/2016/08/codigo-php-html-javascript-wordpress-840x563.jpg",
        text: "Explora funciones avanzadas como diagramas de flujo y conexión con Jira.",
    },
];

const Inicio = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="inicio container-fluid">
            {/* Banner */}
            <div className="banner position-relative text-center">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image.url}
                        alt={`Banner ${index + 1}`}
                        className={`img-fluid w-100 ${index === currentIndex ? "d-block" : "d-none"}`}
                    />
                ))}
                <h1 className="banner-title display-4 fw-bold position-absolute top-45 start-50 translate-middle text-light custom-title">
                    DocMaker
                </h1>

                <div className="info-text bg-dark text-white p-3 position-absolute bottom-0 start-50 translate-middle-x">
                    <p className="mb-0">{images[currentIndex].text}</p>
                </div>
            </div>

            {/* Secciones */}
            <div className="sections mt-5">
                {/* Sección 1 */}
                <section id="seccion-1" className="mb-5">
                    <h2 className="text-center">¿Qué es DocMaker?</h2>
                    <p>
                        DocMaker es una herramienta diseñada para facilitar la creación de documentación técnica,
                        proporcionando una forma sencilla y eficiente de organizar y generar documentos colaborativos.
                        Con DocMaker, puedes crear documentación para tus proyectos de manera rápida, detallada y con un
                        formato profesional.
                    </p>
                </section>

                {/* Sección 2 */}
                <section id="seccion-2" className="mb-5">
                    <h2 className="text-center">Características</h2>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><strong>Generación automática de documentos:</strong> Crea documentos en formatos como PDF, HTML, Markdown y Excel.</li>
                        <li className="list-group-item"><strong>Gestión de plugins y campos ACF:</strong> Agrega plugins y campos personalizados con facilidad.</li>
                        <li className="list-group-item"><strong>Soporte para diagramas de flujo:</strong> Visualiza y organiza procesos mediante diagramas interactivos.</li>
                        <li className="list-group-item"><strong>Conexión con Jira:</strong> Vincula tu proyecto con Jira para mantener el control sobre las tareas y el progreso.</li>
                    </ul>
                </section>

                {/* Sección 3 */}
                <section id="seccion-3">
                    <h2 className="text-center">Ejemplos</h2><br />
                    <div className="row">
                        {/* Ejemplo 1 */}
                        <div className="col-md-6 mb-4">
                            <div className="card">
                                <img
                                    src="https://www.donwordpress.com/blog/wp-content/uploads/2019/05/formulario-contacto-wordpress-mensajes.jpg"
                                    alt="Ejemplo 1"
                                    className="card-img-top"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Ejemplo 1: Documentación de un Proyecto Web</h5>
                                    <p className="card-text">
                                        Este ejemplo muestra cómo organizar la información de un proyecto web, incluyendo los campos ACF y los plugins utilizados.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Ejemplo 2 */}
                        <div className="col-md-6 mb-4">
                            <div className="card">
                                <img
                                    src="https://kinsta.com/wp-content/uploads/2020/12/upload-the-file.png"
                                    alt="Ejemplo 2"
                                    className="card-img-top"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Ejemplo 2: Generación de Documentación Técnica</h5>
                                    <p className="card-text">
                                        Aquí se presenta cómo generar la documentación técnica a partir de una base de datos de proyectos y configuraciones.
                                    </p>
                                </div>
                            </div>
                        </div>


                        <div className="col-md-6 mb-4">
                            <div className="card">
                                <img
                                    src="https://kinsta.com/wp-content/uploads/2020/12/upload-the-file.png"
                                    alt="Ejemplo 2"
                                    className="card-img-top"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Ejemplo 2: Generación de Documentación Técnica</h5>
                                    <p className="card-text">
                                        Aquí se presenta cómo generar la documentación técnica a partir de una base de datos de proyectos y configuraciones.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 mb-4">
                            <div className="card">
                                <img
                                    src="https://kinsta.com/wp-content/uploads/2020/12/upload-the-file.png"
                                    alt="Ejemplo 2"
                                    className="card-img-top"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Ejemplo 2: Generación de Documentación Técnica</h5>
                                    <p className="card-text">
                                        Aquí se presenta cómo generar la documentación técnica a partir de una base de datos de proyectos y configuraciones.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </div>
    );
};

export default Inicio;
