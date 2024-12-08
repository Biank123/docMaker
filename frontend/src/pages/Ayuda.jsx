import React from 'react';
import { Container, Accordion } from 'react-bootstrap';

const FAQPage = () => {
    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Preguntas Frecuentes</h1>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>¿Qué es esta aplicación?</Accordion.Header>
                    <Accordion.Body>
                        Esta es una herramienta diseñada para ayudar a los equipos a documentar, organizar y visualizar estructuras de código y flujo de trabajo de manera eficiente.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>¿Cómo puedo agregar un nuevo elemento?</Accordion.Header>
                    <Accordion.Body>
                        Para agregar un nuevo elemento, utiliza el formulario ubicado en la parte superior de la página principal. Ingresa un nombre y descripción, y presiona el botón "Agregar Elemento".
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>¿Puedo personalizar los colores?</Accordion.Header>
                    <Accordion.Body>
                        Sí, puedes personalizar los colores de los botones y otros elementos utilizando el archivo CSS o las propiedades de estilo en línea dentro del proyecto.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>¿Cómo descargo el diagrama como imagen?</Accordion.Header>
                    <Accordion.Body>
                        Simplemente haz clic en el botón "Descargar Imagen" ubicado en la página de diagramas, y se generará un archivo PNG del contenido.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    );
};

export default FAQPage;
