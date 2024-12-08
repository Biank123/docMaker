import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Chart, registerables } from "chart.js";
import html2canvas from "html2canvas";
import { Bar, Pie, Line } from "react-chartjs-2";
import './styleButtons.css';

Chart.register(...registerables);

const GenerateGraph = () => {
    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);
    const [graphType, setGraphType] = useState("bar");

    const [chartData, setChartData] = useState(null);

    const handleGenerate = () => {
        if (!labels.length || !values.length) {
            alert("Por favor ingrese datos válidos.");
            return;
        }

        const data = {
            labels: labels.split(","),
            datasets: [
                {
                    label: "Datos ingresados",
                    data: values.split(",").map(Number),
                    backgroundColor: [
                        "#6f42c1",
                        "#5a32a3",
                        "#4b2a89",
                        "#8566cc",
                        "#9677d6",
                    ],
                    borderColor: "#4b2a89",
                    borderWidth: 1,
                },
            ],
        };

        setChartData(data);
    };

    const downloadChart = () => {
        const chartContainer = document.getElementById("chart-container");
        html2canvas(chartContainer).then((canvas) => {
            const link = document.createElement("a");
            link.download = "grafico.png";
            link.href = canvas.toDataURL();
            link.click();
        });
    };

    return (
        <Container>
            <h1 className="text-center mb-4">Generar Gráfico</h1>

            <Row>
                <Col md={6}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Etiquetas (separadas por comas)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ejemplo: Ventas, Usuarios, Proyectos, Páginas..."
                                onChange={(e) => setLabels(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Valores (separados por comas)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ejemplo: 50, 100, 75..."
                                onChange={(e) => setValues(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Tipo de gráfico</Form.Label>
                            <Form.Select
                                onChange={(e) => setGraphType(e.target.value)}
                                value={graphType}
                            >
                                <option value="bar">Barras</option>
                                <option value="line">Líneas</option>
                                <option value="pie">Pastel</option>
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" onClick={handleGenerate} className="btn-hover btn-purple">
                            Generar Gráfico
                        </Button>
                    </Form>
                </Col>

                <Col md={6}>
                    <div
                        id="chart-container"
                        style={{
                            padding: "20px",
                            background: "#f8f9fa",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            textAlign: "center",
                        }}
                    >
                        {chartData && (
                            <>
                                {graphType === "bar" && <Bar data={chartData} />}
                                {graphType === "line" && <Line data={chartData} />}
                                {graphType === "pie" && <Pie data={chartData} />}
                            </>
                        )}
                    </div>

                    {chartData && (
                        <Button
                            variant="success"
                            onClick={downloadChart}
                            className="mt-3 btn-hover btn-purple"
                        >
                            Descargar como Imagen
                        </Button>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default GenerateGraph;
