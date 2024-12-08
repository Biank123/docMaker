import React, { useState, useCallback, useEffect } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { useDrag, useDrop } from "react-dnd";
import html2canvas from "html2canvas";
import './styleButtons.css';

// Componente de diagrama
const FileStructureDiagram = () => {
    const [items, setItems] = useState([]);
    const [lines, setLines] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null); // Elemento seleccionado para la línea

    const [newItemName, setNewItemName] = useState("");
    const [newItemDescription, setNewItemDescription] = useState("");

    // Función para calcular las posiciones de las líneas desde cualquier parte del elemento
    const getLinePositions = (sourceItem, targetItem) => {
        const sourceCenterX = sourceItem.x + sourceItem.width / 2;
        const sourceCenterY = sourceItem.y + sourceItem.height / 2;
        const targetCenterX = targetItem.x + targetItem.width / 2;
        const targetCenterY = targetItem.y + targetItem.height / 2;

        return {
            x1: sourceCenterX,
            y1: sourceCenterY,
            x2: targetCenterX,
            y2: targetCenterY,
        };
    };

    const moveItem = (id, x, y) => {
        setItems(items.map(item => item.id === id ? { ...item, x, y } : item));
    };

    const deleteItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    // Función para agregar un nuevo elemento
    const addNewItem = () => {
        if (!newItemName || !newItemDescription) {
            alert("Por favor ingrese un nombre y una descripción.");
            return;
        }

        const newItem = {
            id: items.length + 1,
            name: newItemName,
            description: newItemDescription,
            x: 100,  // Posición inicial (puede ser dinámica)
            y: 100,
            width: 120,  // Ancho ajustado a 20 caracteres
            height: 80,  // Alto ajustado para el contenido
        };

        // Agregar el nuevo elemento al estado
        setItems([...items, newItem]);
        setNewItemName("");
        setNewItemDescription("");
    };

    // Manejo de hover y selección
    const handleSelectItem = (item) => {
        if (selectedItem) {
            const newLine = getLinePositions(selectedItem, item);
            setLines([...lines, newLine]);  // Crear una nueva línea
            setSelectedItem(null);  // Resetear selección
        } else {
            setSelectedItem(item);  // Seleccionar un elemento
        }
    };

    const DraggableItem = ({ item }) => {
        const [, drag] = useDrag(() => ({
            type: "item",
            item: { id: item.id },
        }));

        return (
            <div
                ref={drag}
                onClick={() => handleSelectItem(item)}  // Al hacer clic seleccionamos
                style={{
                    position: "absolute",
                    top: `${item.y}px`,
                    left: `${item.x}px`,
                    width: `${item.width}px`,
                    height: `${item.height}px`,
                    padding: "10px",
                    border: `2px solid ${selectedItem?.id === item.id ? "purple" : "#ccc"}`,
                    background: "#fff",
                    borderRadius: "5px",
                    cursor: "move",
                    transition: "border 0.3s",
                }}
            >
                <h5>{item.name}</h5>
                <p>{item.description}</p>
                <button
                    onClick={(e) => {
                        e.stopPropagation();  // Para no interferir con el clic de selección
                        deleteItem(item.id);
                    }}
                    style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        background: "violet",

                        color: "black",
                        border: "none",
                        borderRadius: "50%",
                        padding: "5px",
                        cursor: "pointer",
                    }}
                >
                    X
                </button>
            </div>
        );
    };

    const DropArea = ({ children }) => {
        const [, drop] = useDrop(() => ({
            accept: "item",
            drop: (item, monitor) => {
                const delta = monitor.getDifferenceFromInitialOffset();
                const newX = Math.round(delta.x + items.find(i => i.id === item.id)?.x);
                const newY = Math.round(delta.y + items.find(i => i.id === item.id)?.y);
                moveItem(item.id, newX, newY);
            },
        }));

        return (
            <div
                ref={drop}
                style={{
                    position: "relative",
                    width: "100%",
                    height: "500px",
                    border: "2px dashed #aaa",
                    marginTop: "20px",
                    overflow: "auto",  // Permite mover elementos fuera de los límites
                }}
            >
                {children}
            </div>
        );
    };

    // Crear las líneas entre los elementos
    const createLines = useCallback(() => {
        const newLines = [];
        items.forEach((sourceItem) => {
            items.forEach((targetItem) => {
                if (sourceItem.id !== targetItem.id) {
                    newLines.push(getLinePositions(sourceItem, targetItem));
                }
            });
        });
        setLines(newLines);
    }, [items]);

    // Llamamos a la función para generar las líneas cada vez que cambiamos los items
    useEffect(() => {
        createLines();
    }, [items, createLines]);

    const downloadImage = () => {
        const diagram = document.getElementById("diagram-container");
        html2canvas(diagram).then(canvas => {
            const link = document.createElement("a");
            link.download = "diagrama.png";
            link.href = canvas.toDataURL();
            link.click();
        });
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="text-center mb-4">Diagrama de Estructura de Archivos</h1>

                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre del archivo (máximo 10 caracteres)</Form.Label>
                            <Form.Control
                                type="text"
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value.slice(0, 10))}
                                placeholder="Ingrese el nombre del archivo"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Descripción del archivo (máximo 13 caracteres)</Form.Label>
                            <Form.Control
                                type="text"
                                value={newItemDescription}
                                onChange={(e) => setNewItemDescription(e.target.value.slice(0, 13))}
                                placeholder="Ingrese la descripción del archivo"
                            />
                        </Form.Group>

                        <Button variant="primary" className="btn-hover btn-purple" onClick={addNewItem} >Agregar Elemento</Button>
                    </Form>

                    <Button variant="primary" onClick={downloadImage} className="mt-3 btn-hover btn-purple" >Descargar Imagen</Button>

                    <div id="diagram-container" style={{ position: "relative", marginTop: "20px" }}>
                        <DropArea>
                            {items.map((item) => (
                                <DraggableItem key={item.id} item={item} />
                            ))}
                        </DropArea>

                        {lines.map((line, index) => (
                            <svg
                                key={index}
                                style={{
                                    position: "absolute",
                                    left: 0,
                                    top: 0,
                                    pointerEvents: "none",
                                    zIndex: -1,
                                }}
                                width="100%"
                                height="100%"
                            >
                                <line
                                    x1={line.x1}
                                    y1={line.y1}
                                    x2={line.x2}
                                    y2={line.y2}
                                    stroke="black"
                                    strokeWidth="2"
                                />
                            </svg>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default FileStructureDiagram;
