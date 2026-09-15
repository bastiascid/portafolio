// Fondo Matrix Editorial (Lluvia Binaria Sutil)
const canvas = document.getElementById('matrix-bg');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const chars = '01'.split(''); // Binario para estilo tech minimalista
    const fontSize = 14;
    let columns = width / fontSize;
    let drops = [];
    for (let x = 0; x < columns; x++) drops[x] = 1;

    function drawMatrix() {
        // Fondo translúcido para dejar rastro de los números
        ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
        ctx.fillRect(0, 0, width, height);

        // Color del texto (Azul profundo sutil para no romper estética)
        ctx.fillStyle = 'rgba(37, 99, 235, 0.95)'; 
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Reiniciar la gota aleatoriamente para evitar líneas continuas artificiales
            if (drops[i] * fontSize > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    // Velocidad de la lluvia
    setInterval(drawMatrix, 60);

    // Reposicionar al cambiar tamaño de ventana
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        columns = width / fontSize;
        drops = [];
        for (let x = 0; x < columns; x++) drops[x] = 1;
    });
}

// Menú Móvil Overlay
const menuTrigger = document.querySelector('.menu-trigger');
const closeMenu = document.querySelector('.close-menu');
const mobileOverlay = document.querySelector('.mobile-overlay');
const mobileLinks = document.querySelectorAll('.mobile-links a');

if (menuTrigger && mobileOverlay && closeMenu) {
    menuTrigger.addEventListener('click', () => {
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Evita scroll
    });

    closeMenu.addEventListener('click', () => {
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Nav Header Animación (Sticky Shrink)
const navbar = document.querySelector('.nav-editorial');
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Reveal - Intersection Observer
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
    const revealElements = document.querySelectorAll('.reveal-up');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Solo se anima una vez
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));
} else {
    // Modo de accesibilidad sin animaciones
    document.querySelectorAll('.reveal-up').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.classList.add('active');
    });
}
