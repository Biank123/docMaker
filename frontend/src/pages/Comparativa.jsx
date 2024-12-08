import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form, Alert } from "react-bootstrap";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist";
import * as DiffMatchPatch from "diff-match-patch";
import './styleButtons.css';

// Define el componente React y coloca useEffect dentro de él
const DocumentComparisonPage = () => {
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");
    const [differences, setDifferences] = useState(null);
    const [error, setError] = useState(null);

    // Usa useEffect dentro del componente para configurar el worker de PDF.js
    useEffect(() => {
        if (pdfjsLib) {
            pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
        } else {
            console.error("pdfjsLib no se ha cargado correctamente");
        }
    }, []);

    // Función para leer un archivo PDF y extraer el texto
    const extractPdfText = async (file) => {
        try {
            const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
            let text = "";
            const numPages = pdf.numPages;

            for (let pageNum = 1; pageNum <= numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const content = await page.getTextContent();
                const pageText = content.items.map(item => item.str).join(" ");
                text += pageText + " ";
            }
            console.log("Texto extraído del PDF:", text);
            return normalizeText(text); // Normalizar el texto antes de devolverlo
        } catch (err) {
            console.error("Error al procesar el PDF:", err);
            throw new Error("Error al procesar el archivo PDF");
        }
    };

    // Función para leer un archivo Word y extraer el texto
    const extractWordText = async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        console.log("Texto extraído del Word:", result.value);
        return normalizeText(result.value); // Normalizar el texto antes de devolverlo
    };

    // Función para normalizar el texto (eliminar saltos de línea, múltiples espacios, etc.)
    const normalizeText = (text) => {
        return text
            .replace(/\s+/g, " ")  // Reemplaza múltiples espacios por uno solo
            .replace(/[\r\n]+/g, " ") // Reemplaza saltos de línea por espacios
            .trim();  // Elimina espacios al principio y al final
    };

    const handleFileChange = async (file, setText, setFile) => {
        setFile(file);
        setError(null);
        try {
            let text = "";
            if (file.type === "application/pdf") {
                text = await extractPdfText(file);  // Para PDF
            } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                text = await extractWordText(file);  // Para Word
            } else {
                setError("Formato de archivo no soportado");
                return;
            }
            setText(text);
        } catch (err) {
            setError("Error al procesar el archivo");
        }
    };
    const handleCompare = () => {
        if (!file1 || !file2) {
            setError("Debes cargar ambos documentos para compararlos.");
            return;
        }

        console.log("Texto del primer archivo:", text1);
        console.log("Texto del segundo archivo:", text2);

        if (!text1 || !text2) {
            setError("Uno o ambos documentos no contienen texto.");
            return;
        }

        const dmp = new DiffMatchPatch.diff_match_patch();
        const diff = dmp.diff_main(text1, text2);
        dmp.diff_cleanupSemantic(diff);

        console.log("Diferencias detectadas:", diff);

        // Para cada diferencia, obtener su tipo, texto y posición
        const detailedDifferences = diff.map((part, index) => {
            return {
                type: part[0], // -1 (eliminado), 0 (sin cambios), o 1 (añadido)
                text: part[1],
                position: index
            };
        });


        if (detailedDifferences.length > 0) {
            setDifferences(detailedDifferences);  // Actualiza el estado de las diferencias
        } else {
            setDifferences([]);
        }
    };


    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="text-center mb-4">Comparar Documentos</h1>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Selecciona el primer documento</Form.Label>
                            <Form.Control
                                type="file"
                                accept=".pdf, .docx"
                                onChange={(e) => handleFileChange(e.target.files[0], setText1, setFile1)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Selecciona el segundo documento</Form.Label>
                            <Form.Control
                                type="file"
                                accept=".pdf, .docx"
                                onChange={(e) => handleFileChange(e.target.files[0], setText2, setFile2)}
                            />
                        </Form.Group>

                        <Button variant="primary" className="btn btn-hover btn-purple" onClick={handleCompare}>
                            Comparar Documentos
                        </Button>
                    </Form>

                    {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

                    {differences && (
                        <div className="mt-4">
                            <h3>Diferencias:</h3>
                            <div className="mt-3">
                                {differences.map((part, index) => {
                                    const text = part[1];  // Texto de la diferencia
                                    const type = part[0];  // -1 (eliminado), 0 (sin cambios), o 1 (añadido)
                                    const position = part[2];  // Posición de la diferencia en el texto

                                    // Asegurarse de que el tipo es un número
                                    let description = '';
                                    if (type === 1) {
                                        description = "Texto añadido";
                                    } else if (type === -1) {
                                        description = "Texto eliminado";
                                    } else if (type === 0) {
                                        description = "Sin diferencia, igualdad";
                                    } else {
                                        description = "Desconocido";  // Caso por si el tipo no es válido
                                    }

                                    return (
                                        <div
                                            key={index}
                                            className="difference-item"
                                            style={{
                                                marginBottom: '10px',
                                                padding: '10px',
                                                border: '1px solid #ccc',
                                                borderRadius: '5px',
                                            }}
                                        >
                                            {/* Contenedor de la diferencia */}
                                            <p><strong>Texto:</strong> "{text}"</p>
                                            <p><strong>Tipo:</strong> {description}</p>
                                            {/* Añadir la posición donde se encuentra la diferencia */}
                                            <p><strong>Posición:</strong> {position ? `Posición en el texto: ${position}` : "Posición no disponible"}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}



                </Col>
            </Row>
        </Container>
    );
};

export default DocumentComparisonPage;
