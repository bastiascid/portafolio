// Custom Cursor / Glowing Effect
document.addEventListener('mousemove', (e) => {
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    if (orb1 && orb2) {
        orb1.style.transform = `translate(${x * 50}px, ${y * 50}px)`;
        orb2.style.transform = `translate(-${x * 30}px, -${y * 30}px)`;
    }
});

// Mobile Navigation Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        let expanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true' || false;
        mobileMenuBtn.setAttribute('aria-expanded', !expanded);
    });
}

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('active');
    navLinks.classList.remove('active');
}));

// Scroll Reveal
function reveal() {
    var reveals = document.querySelectorAll(".reveals");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
reveal();

// --- Proyectos Estáticos (Documentación pública, Código privado) ---
const PROJECTS_DATA = [
    {
        name: "La Canasta",
        description: "Plataforma integral de e-commerce para distribución de alimentos al por mayor en la Región de O'Higgins. Incluye catálogo autogestionable por el administrador mediante LocalStorage, carrito de compras avanzado y un sistema de pedidos optimizado para WhatsApp que facilita la conversión directa con clientes B2B.",
        tags: ["HTML5", "CSS3", "JavaScript ES6", "LocalStorage"],
        icon: "🛒",
        image: "assets/projects/la-canasta.png"
    },
    {
        name: "SmartUrna",
        description: "Solución de votación electrónica de alta fidelidad diseñada para procesos democráticos transparentes. Implementa un sistema de gestión de usuarios, padrones electorales dinámicos y un motor de escrutinio en tiempo real con visualización de datos mediante gráficos interactivos, garantizando la integridad de cada voto.",
        tags: ["PHP 8.x", "MySQL", "Chart.js", "Security"],
        icon: "🗳️",
        image: "assets/projects/smarturna.png"
    },
    {
        name: "Módulo Mantenciones",
        description: "Sistema de Planificación de Recursos (ERP) enfocado en el mantenimiento industrial y gestión de flotas. Permite el seguimiento exhaustivo de órdenes de trabajo, control de stock de repuestos, alertas automáticas para mantenimientos preventivos y generación de reportes de eficiencia operativa para la toma de decisiones.",
        tags: ["PHP", "SQL Server", "Enterprise Arch", "Business Intelligence"],
        icon: "🛠️",
        image: "assets/projects/mantenciones.png"
    },
    {
        name: "La Bluesería",
        description: "Experiencia digital premium desarrollada para una tienda boutique de instrumentos musicales. El proyecto se centra en una estética visual impactante (Dark Mode), micro-interacciones fluidas y un diseño orientado al producto que eleva el valor de marca y mejora significativamente la retención del usuario.",
        tags: ["Web Design", "Animations", "Responsive Design", "UX/UI"],
        icon: "🎸",
        image: "assets/projects/la-blueseria.png"
    },
    {
        name: "Medical Appointments",
        description: "Sistema robusto de gestión clínica que centraliza la administración de pacientes, disponibilidad de profesionales y fichas médicas electrónicas. Diseñado con una arquitectura escalable, facilita la organización de turnos y mejora la comunicación entre el centro médico y los pacientes.",
        tags: ["Python", "Django", "PostgreSQL", "Full Stack"],
        icon: "🏥",
        image: "assets/projects/medical-appointments.png"
    },
    {
        name: "Appyúdame",
        description: "Proyecto con impacto social que facilita la conexión entre redes de apoyo y personas vulnerables. La plataforma permite la geolocalización de solicitudes de ayuda, gestión de voluntarios y seguimiento de casos en tiempo real, optimizando la entrega de recursos comunitarios.",
        tags: ["React Native", "Firebase", "Real-time DB", "Social Impact"],
        icon: "🤝",
        image: "assets/projects/appyudame.png"
    }
];

function renderProjects() {
    const projectsContainer = document.getElementById('github-projects');
    if (!projectsContainer) return;

    projectsContainer.innerHTML = '';

    PROJECTS_DATA.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card glass-card';
        
        let tagsHTML = project.tags.map(tag => `<span>${tag}</span>`).join('');

        card.innerHTML = `
            <div class="image-container">
                <img src="${project.image}" alt="${project.name}" class="project-image" onerror="this.src='https://placehold.co/600x400/0b0f19/e2e8f0?text=${project.name}'">
            </div>
            <div class="project-content">
                <div class="project-header" style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                    <span style="font-size: 1.5rem;">${project.icon || '💻'}</span>
                    <h3 style="margin: 0; color: var(--accent);">${project.name}</h3>
                </div>
                <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-muted); margin-bottom: 20px;">${project.description}</p>
                <div class="project-tags">
                    ${tagsHTML}
                </div>
                <div style="margin-top: auto; padding-top: 20px; font-size: 0.8rem; color: var(--secondary); font-weight: 600; display: flex; align-items: center; gap: 8px;">
                    <i class="fas fa-lock"></i> REPOSITORIO PRIVADO
                </div>
            </div>
        `;

        projectsContainer.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', renderProjects);
