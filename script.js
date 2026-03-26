// Custom Cursor / Glowing Effect on mouse move (Optional subtle effect)
document.addEventListener('mousemove', (e) => {
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');
    
    // Slow parallax effect for orbs
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

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('active');
    navLinks.classList.remove('active');
}));

// Scroll Reveal Effects
function reveal() {
    var reveals = document.querySelectorAll(".reveals");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150; // trigger point

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

// Attach scroll event
window.addEventListener("scroll", reveal);

// Initial reveal check
reveal();

// --- Fetch GitHub Projects ---
const GITHUB_USERNAME = 'bastiascid'; // Corrected username

async function fetchGitHubProjects() {
    const projectsContainer = document.getElementById('github-projects');
    if (!projectsContainer) return;

    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
        
        if (!response.ok) {
            throw new Error('Error limit API or user not found');
        }

        const repos = await response.json();
        
        // Clear loading message
        projectsContainer.innerHTML = '';

        if (repos.length === 0) {
            projectsContainer.innerHTML = '<p class="text-muted" style="grid-column: 1 / -1; text-align: center;">No se encontraron proyectos públicos.</p>';
            return;
        }

        repos.forEach(repo => {
            // Optional: Filter out forks or specific repos if needed
            if (repo.fork) return;

            const card = document.createElement('a');
            card.href = repo.html_url;
            card.target = '_blank';
            card.className = 'project-card glass-card';
            card.style.display = 'flex'; // Ensure flex layout like before
            card.style.textDecoration = 'none';

            // Topics / Language tags
            let tagsHTML = '';
            if (repo.language) {
                tagsHTML += `<span>${repo.language}</span>`;
            }
            if (repo.topics && repo.topics.length > 0) {
                repo.topics.slice(0, 3).forEach(topic => {
                    tagsHTML += `<span>${topic}</span>`;
                });
            }

            card.innerHTML = `
                <div class="project-content">
                    <h3>${repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}</h3>
                    <p>${repo.description || 'Sin descripción disponible.'}</p>
                    <div class="project-tags">
                        ${tagsHTML || '<span>GitHub</span>'}
                    </div>
                </div>
            `;

            projectsContainer.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error fetching github projects:', error);
        projectsContainer.innerHTML = `
            <div class="text-center" style="grid-column: 1 / -1; color: var(--text-muted); padding: 2rem;">
                <p>No se pudieron cargar los proyectos de GitHub. Por favor, visita el perfil directamente.</p>
                <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" class="btn btn-outline mt-4">Ver GitHub</a>
            </div>
        `;
    }
}

// Fetch on load
document.addEventListener('DOMContentLoaded', fetchGitHubProjects);
