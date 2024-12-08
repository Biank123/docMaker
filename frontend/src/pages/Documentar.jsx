// EL LOGO EN WORD Y PDF NO CARGA CORRECTAMENTE Y DEBE APARECER COMO OPCIÓN SOLO EN WORD Y PDF
// FALTAN DATOS A AÑADIR EN LA DOCUMENTACIÓN, COMO SEO, CONFIGURACIÓN DEL SERVIDOR Y DATOS DE INSTALACIÓN
// AÑADIR FECHA DE TÉRMINO
// ORDENAR EL WORD GENERADO ALINEADO A LA DERECHA Y EN COLUMNA


import React, { useState, useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import flatpickr from "flatpickr";
import { Document, Packer, Paragraph, AlignmentType, ImageRun } from "docx";
import "flatpickr/dist/flatpickr.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import './styleButtons.css';
import logoRompecabeza from '../images/logoRompecabeza.png';
import logoMind from '../images/logoMind.png';
import logoSoul from '../images/logoSoul.png';
import logoFeel from '../images/logoFeel.png';
import logoAudibots from '../images/logoAudibots.png';
import logoHera from '../images/logoHera.png';
import logoShop from '../images/logoShop.png';
import logoCraze from '../images/LogoCraze-negro.png';
import logoGinElemental from '../images/logoGinElemental.png';

const App = () => {
    const [cms, setCms] = useState("");
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [cmsVersion, setCmsVersion] = useState("");
    const [dates, setDates] = useState("");
    const [language, setLanguage] = useState("");
    const [timezone, setTimezone] = useState("");
    const [seo, setSeo] = useState("");
    const [plugins, setPlugins] = useState([]);
    const [acfFields, setAcfFields] = useState([]);
    const [format, setFormat] = useState("pdf");

    const [selectedLogo, setSelectedLogo] = useState("");
    const [frontendTech, setFrontendTech] = useState([]);
    const [backendTech, setBackendTech] = useState([]);
    const [dbConfig, setDbConfig] = useState('');
    // const [installSteps, setInstallSteps] = useState('');
    const [loginDetails, setLoginDetails] = useState('');
    const [frontendTechList, setFrontendTechList] = useState([]);
    const [backendTechList, setBackendTechList] = useState([]);
    const [files, setFiles] = useState([]);
    const [projectStructure, setProjectStructure] = useState([]);
    const [devSteps, setDevSteps] = useState([]);
    const [codeExamples, setCodeExamples] = useState([]);
    const [scripts, setScripts] = useState([]);
    const [backups, setBackups] = useState("");
    const [serverConfig, setServerConfig] = useState("");

    const predefinedLogos = [
        { name: "Logo Rompecabeza", url: logoRompecabeza },
        { name: "Logo Mind", url: logoMind },
        { name: "Logo Soul", url: logoSoul },
        { name: "Logo Feel", url: logoFeel },
        { name: "Logo Audibots", url: logoAudibots },
        { name: "Logo Hera", url: logoHera },
        { name: "Logo Shop the label", url: logoShop },
        { name: "Logo Craze", url: logoCraze },
        { name: "Logo Gin Elemental", url: logoGinElemental },
    ];

    // Función para manejar el cambio del logo seleccionado
    const handleLogoChange = (e) => {
        setSelectedLogo(e.target.value);  // Establece la URL seleccionada
    };

    // Función para añadir tecnología
    const handleAddFrontendTech = () => {
        if (frontendTech && !frontendTechList.includes(frontendTech)) {
            setFrontendTechList([...frontendTechList, frontendTech]);
            setFrontendTech(''); // Limpiar campo
        }
    };

    const handleAddBackendTech = () => {
        if (backendTech && !backendTechList.includes(backendTech)) {
            setBackendTechList([...backendTechList, backendTech]);
            setBackendTech(''); // Limpiar campo
        }
    };


    // Función para eliminar una tecnología de la lista
    const handleRemoveTech = (tech, type) => {
        if (type === 'frontend') {
            setFrontendTechList(frontendTechList.filter(item => item !== tech));
        } else {
            setBackendTechList(backendTechList.filter(item => item !== tech));
        }
    };

    // Función para manejar la carga de archivos
    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);

        // Filtrar solo imágenes (png, jpg, jpeg, gif, etc.)
        const imageFiles = newFiles.filter(file =>
            file.type.startsWith('image/')
        );

        console.log("Imágenes cargadas: ", imageFiles); // Verificar las imágenes

        // Agregar las nuevas imágenes al estado
        setFiles((prevFiles) => [...prevFiles, ...imageFiles]);
    };


    // Función para eliminar un archivo
    const handleRemoveFile = (fileName) => {
        setFiles((prevFiles) => prevFiles.filter(file => file.name !== fileName));
    };


    const dateInputRef = useRef(null);

    useEffect(() => {
        if (dateInputRef.current) {
            flatpickr(dateInputRef.current, {
                dateFormat: "Y-m-d",
                altInput: true,
                altFormat: "F j, Y",
                onChange: (selectedDates) => {
                    setDates(
                        selectedDates[0] ? selectedDates[0].toISOString().split("T")[0] : ""
                    );
                },
            });
        }
    }, []);

    // Añadir un plugin
    const handleAddPlugin = () => {
        const pluginName = document.getElementById("pluginName").value;
        const pluginDetails = document.getElementById("pluginDetails").value;
        if (pluginName && pluginDetails) {
            setPlugins([...plugins, { pluginName, pluginDetails }]);
            document.getElementById("pluginName").value = ""; // Limpiar el campo
            document.getElementById("pluginDetails").value = ""; // Limpiar el campo
        }
    };

    // Eliminar un plugin
    const handleRemovePlugin = (index) => {
        const updatedPlugins = plugins.filter((_, i) => i !== index);
        setPlugins(updatedPlugins);
    };

    // Añadir un campo ACF
    const handleAddAcfField = () => {
        const acfField = document.getElementById("acfField").value;
        const acfId = document.getElementById("acfId").value;
        const acfPage = document.getElementById("acfPage").value;
        if (acfField && acfId && acfPage) {
            setAcfFields([...acfFields, { acfField, acfId, acfPage }]);
            document.getElementById("acfField").value = ""; // Limpiar el campo
            document.getElementById("acfId").value = ""; // Limpiar el campo
            document.getElementById("acfPage").value = ""; // Limpiar el campo
        }
    };

    // Eliminar un campo ACF
    const handleRemoveAcfField = (index) => {
        const updatedAcfFields = acfFields.filter((_, i) => i !== index);
        setAcfFields(updatedAcfFields);
    };

    const generatePDF = async (content, images = [], selectedLogo = "") => {
        try {
            const doc = new jsPDF();
            doc.setFontSize(12);

            // Debugging
            console.log("Logo seleccionado:", selectedLogo);
            console.log("Imágenes a añadir:", images);

            // Agregar el logo solo en la primera página
            if (selectedLogo) {
                const response = await fetch(selectedLogo); // Cargar el logo
                const blob = await response.blob();

                const base64Logo = await readFileAsBase64(blob); // Esperar a que se resuelva la promesa de lectura del archivo
                const imgData = base64Logo.startsWith('data:') ? base64Logo : `data:image/png;base64,${base64Logo}`;

                // Agregar el logo en la primera página (tamaño mayor)
                doc.addImage(imgData, 'PNG', 10, 10, 60, 30); // Tamaño ajustado de logo

                // Después de agregar el logo, no lo volvemos a añadir en páginas siguientes
                let yPosition = 50;

                // Dividir el contenido en párrafos y manejar salto de página
                const lines = doc.splitTextToSize(content, 180); // 180 es el ancho del contenido en mm
                for (let i = 0; i < lines.length; i++) {
                    if (yPosition > 270) { // Salto de página si la posición supera el límite de la página
                        doc.addPage();
                        yPosition = 10; // Reiniciar la posición para la nueva página
                    }
                    doc.text(lines[i], 10, yPosition);
                    yPosition += 10; // Espaciado entre líneas
                }

                // Manejo de imágenes
                const base64Images = await Promise.all(
                    images.map(async (imageFile) => {
                        const base64 = await convertImageToBase64(imageFile);
                        return {
                            base64,
                            name: imageFile.name,
                            type: imageFile.type
                        };
                    })
                );

                base64Images.forEach((image, index) => {
                    if (yPosition > 220) { // Salto de página para imágenes grandes
                        doc.addPage();
                        yPosition = 10;
                    }
                    const imgData = `data:${image.type};base64,${image.base64}`;
                    doc.addImage(imgData, 'JPEG', 10, yPosition, 150, 100); // Tamaño ajustado de la imagen
                    yPosition += 110; // Espaciado para la siguiente imagen
                });

                // Descargar el PDF
                doc.save(`${projectName}_documentacion.pdf`);
            } else {
                // Si no hay logo, simplemente generamos el contenido sin él
                let yPosition = 10;

                const lines = doc.splitTextToSize(content, 180); // 180 es el ancho del contenido en mm
                for (let i = 0; i < lines.length; i++) {
                    if (yPosition > 270) { // Salto de página si la posición supera el límite de la página
                        doc.addPage();
                        yPosition = 10; // Reiniciar la posición para la nueva página
                    }
                    doc.text(lines[i], 10, yPosition);
                    yPosition += 10; // Espaciado entre líneas
                }

                // Manejo de imágenes
                const base64Images = await Promise.all(
                    images.map(async (imageFile) => {
                        const base64 = await convertImageToBase64(imageFile);
                        return {
                            base64,
                            name: imageFile.name,
                            type: imageFile.type
                        };
                    })
                );

                base64Images.forEach((image, index) => {
                    if (yPosition > 220) { // Salto de página para imágenes grandes
                        doc.addPage();
                        yPosition = 10;
                    }
                    const imgData = `data:${image.type};base64,${image.base64}`;
                    doc.addImage(imgData, 'JPEG', 10, yPosition, 150, 100); // Tamaño ajustado de la imagen
                    yPosition += 110; // Espaciado para la siguiente imagen
                });

                // Descargar el PDF
                doc.save(`${projectName}_documentacion.pdf`);
            }
        } catch (error) {
            console.error("Error in generatePDF:", error);
        }
    };

    // Función para leer el archivo con FileReader y devolverlo como base64
    const readFileAsBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };


    // function convertImageToBase64(file) {
    //     return new Promise((resolve, reject) => {
    //         console.log("Archivo recibido:", file);

    //         // Si es una URL (como "/static/media/logoRompecabeza...")
    //         if (typeof file === 'string') {
    //             console.log("Es una URL:", file);

    //             // Si la URL ya es base64, no es necesario procesarla más
    //             if (file.startsWith('data:') || file.startsWith('http') || file.startsWith('blob:')) {
    //                 console.log("Es una URL válida, devolviendo como está:", file);
    //                 resolve(file);  // Si ya es base64 o URL válida, simplemente resuelve el valor
    //             } else {
    //                 // Para imágenes locales, por ejemplo, dentro de "public" en React
    //                 const url = new URL(file, window.location.href);  // Convierte a URL absoluta
    //                 resolve(url.toString());  // Devuelve la URL como está
    //             }
    //         } else {
    //             // Para objetos File (por ejemplo, imágenes cargadas desde el sistema)
    //             const reader = new FileReader();
    //             reader.onloadend = () => {
    //                 console.log("Base64 desde archivo:", reader.result);
    //                 resolve(reader.result);  // Devuelve base64 del archivo
    //             };
    //             reader.onerror = reject;
    //             reader.readAsDataURL(file);
    //         }
    //     });
    // }





    const generateExcel = (content) => {
        const worksheet = XLSX.utils.aoa_to_sheet([["Contenido"], [content]]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Documento");
        XLSX.writeFile(workbook, `${projectName}_documentacion.xlsx`);
    };

    const generateHTML = async (content, images = []) => {
        try {
            // Convertir imágenes a base64
            const base64Images = await Promise.all(
                images.map(async (imageFile) => {
                    const base64 = await convertImageToBase64(imageFile);
                    return {
                        base64,
                        name: imageFile.name,
                        type: imageFile.type
                    };
                })
            );

            let htmlContent = `
                <html>
                    <head><title>${projectName} - Documentación</title></head>
                    <body>
                        <h1>${projectName}</h1>
                        <pre>${content}</pre>
            `;

            // Añadir imágenes al HTML
            base64Images.forEach((image) => {
                htmlContent += `<img src="data:${image.type};base64,${image.base64}" alt="${image.name}" width="200" height="200">`;
            });

            htmlContent += `</body></html>`;

            const blob = new Blob([htmlContent], { type: "text/html" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `${projectName}_documentacion.html`;
            link.click();
        } catch (error) {
            console.error("Error in generateHTML:", error);
        }
    };



    const generateMarkdown = (content) => {
        const markdownContent = `
            # ${projectName}

            ## Descripción:
            ${content}
        `;
        const blob = new Blob([markdownContent], { type: "text/markdown" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${projectName}_documentacion.md`;
        link.click();
    };

    const generateJSON = (content) => {
        const jsonContent = {
            projectName,
            description,
            content,
        };
        const blob = new Blob([JSON.stringify(jsonContent, null, 2)], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${projectName}_documentacion.json`;
        link.click();
    };

    // Función para convertir imagen a base64
    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            console.log("Archivo recibido:", file);

            // Si es una URL (cadena de texto) o base64 ya
            if (typeof file === 'string') {
                console.log("Es una cadena de URL:", file);

                // Si es una URL o base64, la devolvemos tal cual
                if (file.startsWith('data:') || file.startsWith('blob:') || file.startsWith('http')) {
                    console.log("Base64 desde URL o ruta estática:", file);
                    resolve(file);  // Ya es base64 o URL válida
                } else {
                    // Si es una ruta local, hacer fetch para obtener el Blob y convertirlo a base64
                    fetch(file)
                        .then(response => response.blob())
                        .then(blob => {
                            readFileAsBase64(blob)
                                .then(base64 => resolve(base64))
                                .catch(reject);
                        })
                        .catch(reject);
                }
            } else if (file instanceof Blob) {
                // Si es un objeto Blob (como un archivo), usamos FileReader
                readFileAsBase64(file)
                    .then(base64 => resolve(base64))
                    .catch(reject);
            } else {
                reject(new Error("Tipo de archivo no soportado"));
            }
        });
    };

    const generateWord = async (content, images = [], selectedLogo = "") => {
        try {
            console.log("Iniciando generación de Word");

            // Convertir el logo seleccionado a base64 si se eligió uno
            let base64Logo = null;
            if (selectedLogo) {
                console.log("Logo seleccionado:", selectedLogo);
                // Si el logo es una URL (cadena), no convertirlo a base64
                if (typeof selectedLogo === 'string' && (selectedLogo.startsWith('http') || selectedLogo.startsWith('data:'))) {
                    console.log("El logo es una URL, se usa directamente");
                    base64Logo = selectedLogo;  // Usar la URL directamente
                } else {
                    console.log("El logo es un archivo, se convierte a base64");
                    base64Logo = await convertImageToBase64(selectedLogo);  // Convertir el archivo a base64
                }
            }

            // Convertir las imágenes a base64
            console.log("Imágenes a convertir:", images);
            const base64Images = await Promise.all(
                images.map(async (imageFile) => {
                    console.log("Imagen en proceso:", imageFile);
                    const base64 = await convertImageToBase64(imageFile);
                    return {
                        base64,
                        name: imageFile.name,
                        type: imageFile.type
                    };
                })
            );

            console.log("Base64 de imágenes:", base64Images);

            // Crear el documento Word
            const doc = new Document({
                sections: [
                    {
                        properties: {},
                        children: [
                            // Añadir el logo en la esquina superior izquierda si existe
                            ...(base64Logo ? [
                                new Paragraph({
                                    children: [
                                        new ImageRun({
                                            data: base64Logo,
                                            transformation: {
                                                width: 180,  // Ancho del logo
                                                height: 80  // Alto del logo
                                            }
                                        })
                                    ],
                                    alignment: AlignmentType.LEFT
                                })
                            ] : []),

                            // Añadir el contenido de texto como párrafos
                            ...content.split("\n\n").map((section) => {
                                return new Paragraph({
                                    text: section.trim(),
                                    spacing: { after: 200 },
                                    alignment: AlignmentType.LEFT,
                                    indent: { left: 360 },
                                });
                            }),

                            // Añadir imágenes como párrafos separados
                            ...base64Images.map((image) => {
                                return new Paragraph({
                                    children: [
                                        new ImageRun({
                                            data: image.base64,
                                            transformation: { width: 200, height: 200 },
                                            altText: image.name
                                        })
                                    ],
                                    alignment: AlignmentType.CENTER
                                });
                            })
                        ]
                    }
                ]
            });

            // Convertir el documento a un blob y descargarlo
            Packer.toBlob(doc).then((blob) => {
                console.log("Documento generado como Blob:", blob);
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = `${projectName || "documentacion"}_documentacion.docx`;
                link.click();
            }).catch((error) => {
                console.error("Error creando el documento Word:", error);
            });
        } catch (error) {
            console.error("Error en generateWord:", error);
        }
    };







    const generateContent = () => {
        const pluginContent = plugins.map((plugin) => `${plugin.pluginName}: ${plugin.pluginDetails}`).join("\n");
        const acfContent = acfFields.map(
            (field) => `${field.acfField} (ID: ${field.acfId}, Relación: ${field.acfPage})`
        ).join("\n");
        const structureContent = Array.isArray(projectStructure) ? projectStructure.join("\n") : "No definida";
        const devStepsContent = Array.isArray(devSteps) ? devSteps.join("\n") : "No definido";
        const frontendContent = Array.isArray(frontendTechList) ? frontendTechList.join(", ") : "No definido";
        const backendContent = Array.isArray(backendTechList) ? backendTechList.join(", ") : "No definido";
        const scriptsContent = Array.isArray(scripts) ? scripts.join("\n") : "No definidos";
        const codeExamplesContent = Array.isArray(codeExamples) ? codeExamples.join("\n") : "No definidos";

        // Retornar el contenido generado
        return {
            textContent: `
                # Nombre del Proyecto: ${projectName}
    
                ## Descripción:
                ${description}
    
                ## Versión del CMS:
                ${cmsVersion}
    
                ## Fechas:
                ${dates}
    
                ## Idioma:
                ${language}
    
                ## Zona Horaria:
                ${timezone}
    
                ## SEO Configuración:
                ${seo}
    
                ## Tecnologías Frontend:
                ${frontendContent}
    
                ## Tecnologías Backend:
                ${backendContent}
    
                ## Configuración de la Base de Datos:
                ${dbConfig}
    
                ## Detalles de Login:
                ${loginDetails}
    
                ## Estructura del Proyecto:
                ${structureContent}
    
                ## Pasos del Desarrollo:
                ${devStepsContent}
    
                ## Ejemplos de Código:
                ${codeExamplesContent}
    
                ## Scripts:
                ${scriptsContent}
    
                ## Plugins:
                ${pluginContent}
    
                ## Campos ACF (si aplica):
                ${acfContent}
    
                ## Backups:
                ${backups}
    
                ## Configuración del Servidor:
                ${serverConfig}
            `,
            images: files // Lista de imágenes subidas
        };
    };


    const generateDocumentation = async () => {
        const { textContent, images } = generateContent(); // Obtener contenido y imágenes
        if (format === "pdf") await generatePDF(textContent, images, selectedLogo); // Pasar contenido y imágenes al PDF
        if (format === "html") generateHTML(textContent);
        if (format === "md") generateMarkdown(textContent);
        if (format === "json") generateJSON(textContent);
        if (format === "excel") generateExcel(textContent);
        if (format === 'word') await generateWord(textContent, images, selectedLogo);
    };


    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Generador de Documentación Técnica</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    generateDocumentation();
                }}
            >
                <div className="mb-3">
                    <label htmlFor="cmsSelect" className="form-label">
                        Selecciona el CMS
                    </label>
                    <select
                        id="cmsSelect"
                        className="form-select"
                        value={cms}
                        onChange={(e) => setCms(e.target.value)}
                    >
                        <option value="">Selecciona...</option>
                        <option value="wordpress">WordPress</option>
                        <option value="shopify">Shopify</option>
                        <option value="liferay">Liferay</option>
                        <option value="otro">Otro</option>
                    </select>
                    {cms === "Otro" && (
                        <input
                            type="text"
                            className="form-control mt-2"
                            placeholder="Escribe el CMS"
                            onChange={(e) => setCms(e.target.value)}
                            value={cms}
                        />
                    )}
                </div>
                {/* NOMBRE PROYECTO */}
                <div className="mb-3">
                    <label htmlFor="projectName" className="form-label">
                        Nombre del Proyecto
                    </label>
                    <input
                        type="text"
                        id="projectName"
                        className="form-control"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="Ej. Sitio Corporativo"
                    />
                </div>
                {/* DESCRIPCION */}
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Descripción
                    </label>
                    <textarea
                        id="description"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="3"
                        placeholder="Breve descripción del proyecto"
                    />
                </div>
                {/* TRANSFORMAR IDIOMA EN SELECT */}
                <div className="mb-3">
                    <label htmlFor="language" className="form-label">Idioma del Proyecto:</label>
                    <select
                        type="text"
                        className="form-control"
                        id="language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="">Selecciona...</option>
                        <option value="1.0">Español</option>
                        <option value="2.0">Inglés</option>
                        <option value="3.0">Francés</option>
                        <option value="4.0">Portugués</option>
                        <option value="5.0">Italiano</option>
                        <option value="6.0">Danés</option>
                        <option value="7.0">Chino</option>
                        <option value="8.0">Coreano</option>
                        <option value="9.0">Otro...</option>

                    </select>
                    {language === "Otro" && (

                        <input
                            type="text"
                            className="form-control mt-2"
                            placeholder="Escribe el idioma del proyecto"
                            onChange={(e) => setTimezone(e.target.value)}
                            value={language}
                        />

                    )}
                </div>
                {/* VERSION CMS */}
                <div className="mb-3">
                    <label htmlFor="cmsVersion" className="form-label">
                        Versión del CMS
                    </label>
                    <select
                        id="cmsVersion"
                        className="form-select"
                        value={cmsVersion}
                        onChange={(e) => setCmsVersion(e.target.value)}
                    >
                        <option value="">Selecciona...</option>
                        <option value="1.0">1.0</option>
                        <option value="2.0">2.0</option>
                        <option value="3.0">3.0</option>
                    </select>
                </div>
                {/* FECHAS */}
                <div className="mb-3">
                    <label htmlFor="dates" className="form-label">
                        Fecha de inicio del proyecto
                    </label>
                    <input
                        type="text"
                        ref={dateInputRef}
                        className="form-control"
                        placeholder="Selecciona una fecha"
                    />
                </div>
                {/* AÑADIR FECHA DE TÉRMINO */}
                {/* PLUGINS */}
                <fieldset className="border p-3 mb-3">
                    <legend className="w-auto px-2">Plugins Instalados</legend>
                    <div className="mb-3">
                        <label htmlFor="pluginName" className="form-label">
                            Nombre del Plugin
                        </label>
                        <input
                            type="text"
                            id="pluginName"
                            className="form-control"
                            placeholder="Ej. Yoast SEO"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pluginDetails" className="form-label">
                            Detalles del Plugin
                        </label>
                        <textarea
                            id="pluginDetails"
                            className="form-control"
                            rows="3"
                            placeholder="Detalles del plugin"
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary btn-hover btn-purple"
                        onClick={handleAddPlugin}

                    >
                        Añadir Plugin
                    </button>

                    {/* Mostrar los plugins añadidos */}
                    <ul className="mt-3">
                        {plugins.map((plugin, index) => (
                            <li key={index}>
                                {plugin.pluginName}: {plugin.pluginDetails}
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm ml-2"
                                    onClick={() => handleRemovePlugin(index)}
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                </fieldset>
                {/* ACF */}
                {cms === "wordpress" && (
                    <fieldset className="border p-3 mb-3">
                        <legend className="w-auto px-2">Campos ACF (si aplica)</legend>
                        <div className="mb-3">
                            <label htmlFor="acfField" className="form-label">
                                Nombre del Campo ACF
                            </label>
                            <input
                                type="text"
                                id="acfField"
                                className="form-control"
                                placeholder="Ej. Custom Title"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="acfId" className="form-label">
                                ID del Campo ACF
                            </label>
                            <input
                                type="text"
                                id="acfId"
                                className="form-control"
                                placeholder="Ej. custom_title"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="acfPage" className="form-label">
                                Página o Post relacionado
                            </label>
                            <input
                                type="text"
                                id="acfPage"
                                className="form-control"
                                placeholder="Ej. Página Principal"
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary btn-hover btn-purple"
                            onClick={handleAddAcfField}

                        >
                            Añadir Campo ACF
                        </button>

                        {/* Mostrar los campos ACF añadidos */}
                        <ul className="mt-3">
                            {acfFields.map((field, index) => (
                                <li key={index}>
                                    {field.acfField} (ID: {field.acfId}, Relación: {field.acfPage})
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm ml-2 "
                                        onClick={() => handleRemoveAcfField(index)}
                                    >
                                        Eliminar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </fieldset>
                )}
                {/* ZONA HORARIA */}
                <div className="mb-3">
                    <label htmlFor="timezone" className="form-label">Zona Horaria:</label>
                    <select
                        id="timezone"
                        className="form-select"
                        onChange={(e) => setTimezone(e.target.value)}
                    >
                        <option value="">Seleccionar Zona Horaria</option>
                        <option value="UTC">UTC</option>
                        <option value="PST">PST</option>
                        <option value="EST">EST</option>
                        <option value="Otro">Otro</option>
                    </select>
                    {timezone === "Otro" && (
                        <input
                            type="text"
                            className="form-control mt-2"
                            placeholder="Escribe la zona horaria"
                            onChange={(e) => setTimezone(e.target.value)}
                            value={timezone}
                        />
                    )}
                </div>

                {/* Tecnologías Frontend */}
                <div className="mb-3">
                    <label htmlFor="frontendTech" className="form-label">Tecnologías Frontend:</label>
                    <select
                        id="frontendTech"
                        className="form-select"
                        value={frontendTech}
                        onChange={(e) => setFrontendTech(e.target.value)}
                    >
                        <option value="">Seleccionar Frontend</option>
                        <option value="React">React</option>
                        <option value="Vue">Vue</option>
                        <option value="Angular">Angular</option>
                        <option value="Otro">Otro</option>
                    </select>
                    {frontendTech === "Otro" && (
                        <input
                            type="text"
                            className="form-control mt-2"
                            placeholder="Escribe la tecnología frontend"
                            onChange={(e) => setFrontendTech(e.target.value)}
                        />
                    )}
                    <button type="button" onClick={handleAddFrontendTech} className="btn btn-primary mt-2 btn-purple btn-hover">
                        Añadir
                    </button>
                    <ul className="mt-3">
                        {frontendTechList.map((tech, index) => (
                            <li key={index}>
                                {tech}
                                <button type="button" onClick={() => handleRemoveTech(tech, 'frontend')} className="btn btn-danger btn-sm ms-2">X</button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Tecnologías Backend */}
                <div className="mb-3">
                    <label htmlFor="backendTech" className="form-label">Tecnologías Backend:</label>
                    <select
                        id="backendTech"
                        className="form-select"
                        value={backendTech}
                        onChange={(e) => setBackendTech(e.target.value)}
                    >
                        <option value="">Seleccionar Backend</option>
                        <option value="Node.js">Node.js</option>
                        <option value="PHP">PHP</option>
                        <option value="Ruby">Ruby</option>
                        <option value="Otro">Otro</option>
                    </select>
                    {backendTech === "Otro" && (
                        <input
                            type="text"
                            className="form-control mt-2"
                            placeholder="Escribe la tecnología backend"
                            onChange={(e) => setBackendTech(e.target.value)}
                        />
                    )}
                    <button type="button" onClick={handleAddBackendTech} className="btn btn-primary mt-2 btn-purple btn-hover">
                        Añadir
                    </button>
                    <ul className="mt-3">
                        {backendTechList.map((tech, index) => (
                            <li key={index}>
                                {tech}
                                <button type="button" onClick={() => handleRemoveTech(tech, 'backend')} className="btn btn-danger btn-sm ms-2">X</button>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* ESTRUCTURA */}
                <div className="mb-3">
                    <label htmlFor="projectStructure" className="form-label">Estructura del Proyecto:</label>
                    <select
                        id="projectStructure"
                        className="form-select"
                        value={projectStructure}
                        onChange={(e) => setProjectStructure(e.target.value)}
                    >
                        <option value="">Seleccionar Estructura</option>
                        <option value="MVC">MVC</option>
                        <option value="Monolítica">Monolítica</option>
                        <option value="Microservicios">Microservicios</option>
                        <option value="SOA">SOA (Arquitectura Orientada a Servicios)</option>
                        <option value="Serverless">Serverless</option>
                        <option value="Event-Driven">Event-Driven (Orientada a Eventos)</option>
                        <option value="Hexagonal">Hexagonal (Arquitectura Puertos y Adaptadores)</option>
                        <option value="Layered">Layered (Arquitectura por Capas)</option>
                        <option value="Clean">Clean (Arquitectura Limpia)</option>
                        <option value="Plug-in">Plug-in (Arquitectura Modular)</option>
                        <option value="N/A">N/A</option>
                        <option value="Otro">Otro</option>

                    </select>
                    {projectStructure === "Otro" && (
                        <input
                            type="text"
                            className="form-control mt-2"
                            placeholder="Escribe la estructura del proyecto"
                            onChange={(e) => setProjectStructure(e.target.value)}
                        />
                    )}
                </div>
                {/* FASE DEL DESARROLLO */}
                <div className="mb-3">
                    <label htmlFor="devSteps" className="form-label">Fase del Desarrollo:</label>
                    <select
                        id="devSteps"
                        className="form-select"
                        value={devSteps}
                        onChange={(e) => setDevSteps(e.target.value)}
                    >
                        <option value="">Seleccionar Fase</option>
                        <option value="Prospección">Prospección</option>
                        <option value="Propuesta">Propuesta</option>
                        <option value="Bajada de información UX">Bajada de información UX</option>
                        <option value="Diseño UI">Diseño UI</option>
                        <option value="Creación de pantalla">Creación de pantalla</option>
                        <option value="Desarrollo frontend">Desarrollo frontend</option>
                        <option value="Desarrollo backend">Desarrollo backend</option>
                        <option value="QA nivel usuario">QA nivel usuario</option>
                        <option value="QA nivel técnico">QA nivel técnico</option>
                        <option value="QA ciberseguridad">QA ciberseguridad</option>
                        <option value="Corrección">Corrección</option>
                        <option value="Producción">Producción</option>
                        <option value="Otro">Otro</option>
                    </select>
                    {devSteps === "Otro" && (
                        <input
                            type="text"
                            className="form-control mt-2"
                            placeholder="Escribe los pasos del desarrollo"
                            onChange={(e) => setDevSteps(e.target.value)}
                        />
                    )}
                </div>


                <div className="mb-3">
                    <label htmlFor="scripts" className="form-label">Scripts:</label>
                    <select
                        id="scripts"
                        className="form-select"
                        value={scripts}
                        onChange={(e) => setScripts(e.target.value)}
                    >
                        <option value="">Seleccionar Script</option>
                        <option value="N/A">N/A</option>
                        <option value="Shell">Shell</option>
                        <option value="Python">Python</option>
                        <option value="Otro">Otro</option>
                    </select>
                    {scripts === "Otro" && (
                        <input
                            type="text"
                            className="form-control mt-2"
                            placeholder="Escribe el script"
                            onChange={(e) => setScripts(e.target.value)}
                        />
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="backups" className="form-label">Backups:</label>
                    <select
                        id="backups"
                        className="form-select"
                        value={backups}
                        onChange={(e) => setBackups(e.target.value)}
                    >
                        <option value="">Seleccionar Backup</option>
                        <option value="Automático">Automático</option>
                        <option value="Manual">Manual</option>
                        <option value="Otro">Otro</option>
                    </select>
                    {backups === "Otro" && (
                        <input
                            type="text"
                            className="form-control mt-2"
                            placeholder="Escribe el tipo de backup"
                            onChange={(e) => setBackups(e.target.value)}
                        />
                    )}
                </div>


                <div className="mb-3">
                    <label htmlFor="outputFormat" className="form-label">
                        Formato de Salida
                    </label>
                    <select
                        id="outputFormat"
                        className="form-select"
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                    >
                        <option value="pdf">PDF</option>
                        <option value="html">HTML</option>
                        <option value="md">Markdown</option>
                        <option value="json">JSON</option>
                        <option value="excel">Excel</option>
                        <option value="word">Word</option>
                    </select>
                </div>

                {/* Ejemplos de Código (Archivos) */}
                {(format === "word" || format === "pdf") && (
                    <div className="mb-3">
                        <label htmlFor="codeExamples" className="form-label">
                            Ejemplos de Código (imagen):
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            id="codeExamples"
                            multiple
                            accept="image/*"  // Solo acepta imágenes
                            onChange={handleFileChange}
                        />
                        <ul className="mt-3">
                            {files.map((file, index) => (
                                <li key={index}>
                                    {file.name}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveFile(file.name)}
                                        className="btn btn-danger btn-sm ms-2"
                                    >
                                        X
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {(format === "word" || format === "pdf") && (
                    <div className="mb-3">
                        <label htmlFor="logoSelect" className="form-label">
                            Selecciona un logo
                        </label>
                        <select
                            id="logoSelect"
                            className="form-select"
                            value={selectedLogo}
                            onChange={handleLogoChange}  // Actualiza el logo seleccionado
                        >
                            <option value="">Selecciona un logo</option>
                            {predefinedLogos.map((logo, index) => (
                                <option key={index} value={logo.url}>{logo.name}</option>
                            ))}
                        </select>
                        {selectedLogo && <img src={selectedLogo} alt="Logo seleccionado" style={{ width: '100px', height: 'auto' }} />}
                    </div>
                )}


                <div className="d-flex justify-content-center">
                    <button className="btn btn-success btn-hover btn-purple" type="submit" >
                        Generar Documentación
                    </button>
                </div>
            </form>
        </div>
    );
};

export default App;
