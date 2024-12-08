import React from 'react';
import { Container, Accordion } from 'react-bootstrap';

const BestPractices = ({ cmsName, practices }) => {
    return (
        <Accordion className="mb-4">
            <Accordion.Item eventKey={cmsName}>
                <Accordion.Header>{cmsName}</Accordion.Header>
                <Accordion.Body>
                    <ul>
                        {practices.map((practice, index) => (
                            <li key={index}>{practice}</li>
                        ))}
                    </ul>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

const BestPracticesPage = () => {
    const cmsPractices = [
        {
            cmsName: "WordPress",
            practices: [
                "Mantén WordPress actualizado a la última versión.",
                "Usa un tema hijo para personalizar diseños.",
                "Instala solo plugins esenciales.",
                "Elimina los plugins y temas inactivos.",
                "Optimiza imágenes antes de subirlas.",
                "Configura un sistema de caché para mejorar la velocidad.",
                "Evita modificar directamente el código del núcleo.",
                "Crea respaldos automáticos regulares.",
                "Usa HTTPS para todas las páginas.",
                "Configura la base de datos con prefijos únicos.",
                "Habilita la autenticación en dos pasos (2FA).",
                "Usa contraseñas seguras para administradores.",
                "Implementa un sistema de CDN para archivos estáticos.",
                "Monitorea errores 404 y enlaces rotos.",
                "Optimiza los enlaces permanentes para SEO.",
                "Utiliza herramientas como WP-CLI para tareas repetitivas.",
                "Evita usar nombres de usuario como 'admin'.",
                "Usa un plugin de seguridad como Wordfence.",
                "Restringe el acceso a áreas críticas con .htaccess.",
                "Deshabilita la edición de archivos desde el panel de administración.",
            ],
        },
        {
            cmsName: "Shopify",
            practices: [
                "Configura la navegación con menús claros.",
                "Optimiza las descripciones de los productos para SEO.",
                "Usa un diseño limpio y centrado en el cliente.",
                "Utiliza aplicaciones aprobadas por Shopify.",
                "Habilita reseñas y testimonios en los productos.",
                "Configura métodos de pago seguros y variados.",
                "Realiza pruebas A/B de diseños y funciones.",
                "Optimiza las imágenes de productos para mejorar la carga.",
                "Crea colecciones para categorizar productos eficientemente.",
                "Configura las políticas de devolución y envío visibles.",
                "Usa etiquetas de productos para mejorar la búsqueda interna.",
                "Integra Google Analytics para seguimiento detallado.",
                "Asegúrate de que la tienda sea 100% responsiva.",
                "Configura notificaciones personalizadas para carritos abandonados.",
                "Usa formatos de productos enriquecidos (Rich Snippets).",
                "Configura descuentos y promociones estratégicas.",
                "Segmenta a los clientes por comportamiento y preferencias.",
                "Crea URL amigables y descriptivas para productos.",
                "Evita tener productos sin imágenes.",
                "Mantén la velocidad de carga por debajo de 3 segundos.",
            ],
        },
        {
            cmsName: "Liferay",
            practices: [
                "Divide el contenido en fragmentos reutilizables.",
                "Configura roles y permisos para usuarios.",
                "Usa Layout Templates para un diseño modular.",
                "Evita cargar demasiados scripts en el frontend.",
                "Realiza pruebas de rendimiento regularmente.",
                "Aprovecha los Workflows para automatizar procesos.",
                "Monitorea y limpia datos obsoletos periódicamente.",
                "Integra herramientas externas mediante APIs.",
                "Asegúrate de que los temas sean responsivos.",
                "Utiliza categorías y etiquetas para contenido estructurado.",
                "Configura notificaciones y alertas personalizadas.",
                "Usa caché de Liferay para mejorar la velocidad.",
                "Mantén los registros del sistema limpios y auditables.",
                "Haz actualizaciones de Liferay en un entorno de prueba.",
                "Documenta las personalizaciones para futuros desarrollos.",
                "Evita personalizar directamente los módulos base.",
                "Configura el índice de búsqueda correctamente.",
                "Usa un entorno de desarrollo separado del de producción.",
                "Aprovecha las capacidades de localización y traducción.",
            ],
        },
        {
            cmsName: "Otros CMS populares",
            practices: [
                "Mantén un flujo de trabajo controlado con Git.",
                "Realiza auditorías de seguridad periódicamente.",
                "Optimiza consultas a la base de datos.",
                "Usa sistemas de CI/CD para despliegues controlados.",
                "Aplica compresión GZIP para archivos estáticos.",
                "Minimiza y combina archivos CSS y JS.",
                "Configura monitoreo de servidores y aplicaciones.",
                "Evalúa extensiones y plugins antes de instalarlos.",
                "Establece un sistema de cacheo eficiente.",
                "Evita guardar contraseñas en texto plano.",
                "Usa herramientas de análisis para mejorar UX/UI.",
                "Implementa análisis de logs para detectar problemas.",
                "Configura encabezados HTTP seguros.",
                "Realiza escaneos regulares de vulnerabilidades.",
                "Mantén una lista actualizada de dependencias usadas.",
                "Evita mostrar mensajes de error detallados al usuario final.",
                "Limita los intentos de inicio de sesión fallidos.",
                "Haz copias de seguridad incrementales regularmente.",
                "Configura notificaciones de alertas críticas.",
                // Prácticas generales
                "Usa estándares de codificación consistentes.",
                "Implementa pruebas unitarias y funcionales.",
                "Documenta todas las decisiones técnicas.",
                "Haz revisiones de código con el equipo.",
                "Configura un entorno de prueba robusto.",
                "Monitorea los tiempos de respuesta de la aplicación.",
                "Configura un proceso claro de despliegue.",
                "Usa herramientas de gestión de proyectos.",
                "Evita sobrecargar el sistema con contenido innecesario.",
                "Mantén comunicación clara entre el equipo técnico y no técnico.",
                "Desarrolla con el principio KISS (Keep It Simple, Stupid).",
                "Revisa regularmente los permisos de acceso.",
                "Establece una política clara de copias de seguridad.",
                "Asegúrate de cumplir con GDPR o leyes locales.",
                "Automatiza tareas repetitivas para ahorrar tiempo.",
                "Reutiliza componentes para mantener consistencia.",
                "Usa pruebas de carga para verificar escalabilidad.",
                "Planifica migraciones de datos cuidadosamente.",
            ],
        },
    ];

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Buenas Prácticas en CMS</h1>
            <p className="text-center">
                A continuación, encontrarás ejemplos de buenas prácticas para varios CMS populares.
            </p>
            <Accordion>
                {cmsPractices.map((cms, index) => (
                    <BestPractices
                        key={index}
                        cmsName={cms.cmsName}
                        practices={cms.practices}
                    />
                ))}
            </Accordion>
        </Container>
    );
};

export default BestPracticesPage;
