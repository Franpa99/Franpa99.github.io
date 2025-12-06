/* Función para calcular la edad */
function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    const edad = hoy.getFullYear() - nacimiento.getFullYear();
    if (hoy.getMonth() < nacimiento.getMonth() || (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate())) {
        return edad - 1;
    } else {
        return edad;
    }
}

/* Función para actualizar la edad en el encabezado */
function actualizarEdad() {
    const edad = calcularEdad("1999-11-05");
    const headerDescription = document.getElementById('header-description');
    if (headerDescription) {
        headerDescription.textContent = `¡Hola! Soy Francisco, un apasionado del desarrollo web, desarrollo de videojuegos y fútbol de ${edad} años, oriundo de Montevideo, Uruguay.`;
    }
}

/* Particles Animation */
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.fillStyle = 'rgba(255, 153, 0, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(255, 153, 0, ${0.2 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });
}

/* Ripple Effect */
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

/* Confetti Animation */
function createConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiPieces = [];
    const confettiCount = 100;
    const colors = ['#ff9900', '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'];
    
    class Confetti {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.vx = (Math.random() - 0.5) * 4;
            this.vy = Math.random() * 3 + 2;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 10;
            this.size = Math.random() * 8 + 4;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.rotation += this.rotationSpeed;
            this.vy += 0.1;
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }
    
    for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push(new Confetti());
    }
    
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confettiPieces.forEach((piece, index) => {
            piece.update();
            piece.draw();
            
            if (piece.y > canvas.height) {
                confettiPieces.splice(index, 1);
            }
        });
        
        if (confettiPieces.length > 0) {
            requestAnimationFrame(animateConfetti);
        }
    }
    
    animateConfetti();
}

/* Achievement System */
const achievements = {
    visitor: { 
        title: "¡Primera Visita!", 
        description: "Gracias por visitar mi portafolio", 
        icon: "👋",
        hint: "Simplemente visita el sitio",
        unlocked: false 
    },
    explorer: { 
        title: "Explorador", 
        description: "Visitaste todas las secciones", 
        icon: "🗺️",
        hint: "Navega por todas las secciones del portafolio",
        unlocked: false 
    },
    reader: { 
        title: "Lector Curioso", 
        description: "Pasaste más de 2 minutos en el sitio", 
        icon: "📖",
        hint: "Dedica tiempo a explorar el contenido",
        unlocked: false 
    },
    darkMode: { 
        title: "Modo Nocturno", 
        description: "Activaste el modo oscuro", 
        icon: "🌙",
        hint: "Encuentra el botón para cambiar el tema",
        unlocked: false 
    },
    social: { 
        title: "Social", 
        description: "Visitaste mis redes sociales", 
        icon: "🔗",
        hint: "Haz clic en algún enlace de redes sociales",
        unlocked: false 
    },
    konami: { 
        title: "Código Secreto", 
        description: "¡Descubriste el código Konami!", 
        icon: "🎮",
        hint: "Intenta con: ↑↑↓↓←→←→BA",
        unlocked: false 
    }
};

function unlockAchievement(achievementKey) {
    if (!achievements[achievementKey].unlocked) {
        achievements[achievementKey].unlocked = true;
        showAchievementNotification(achievements[achievementKey]);
        
        const unlockedAchievements = JSON.parse(localStorage.getItem('achievements') || '[]');
        if (!unlockedAchievements.includes(achievementKey)) {
            unlockedAchievements.push(achievementKey);
            localStorage.setItem('achievements', JSON.stringify(unlockedAchievements));
        }
        
        renderAchievements();
    }
}

function showAchievementNotification(achievement) {
    const notification = document.getElementById('achievement-notification');
    const title = notification.querySelector('.achievement-title');
    const description = notification.querySelector('.achievement-description');
    
    title.textContent = achievement.title;
    description.textContent = achievement.description;
    
    notification.classList.remove('achievement-hidden');
    
    setTimeout(() => {
        notification.classList.add('achievement-hidden');
    }, 4000);
}

function loadAchievements() {
    const unlockedAchievements = JSON.parse(localStorage.getItem('achievements') || '[]');
    unlockedAchievements.forEach(key => {
        if (achievements[key]) {
            achievements[key].unlocked = true;
        }
    });
}

function renderAchievements() {
    const achievementsGrid = document.getElementById('achievements-grid');
    const achievementsUnlocked = document.getElementById('achievements-unlocked');
    
    if (!achievementsGrid) return;
    
    achievementsGrid.innerHTML = '';
    let unlockedCount = 0;
    
    Object.entries(achievements).forEach(([key, achievement]) => {
        if (achievement.unlocked) unlockedCount++;
        
        const achievementItem = document.createElement('div');
        achievementItem.className = `achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}`;
        achievementItem.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-content">
                <div class="achievement-title">${achievement.title}</div>
                <div class="achievement-description">${achievement.description}</div>
                ${!achievement.unlocked ? `<div class="achievement-hint">💡 ${achievement.hint}</div>` : ''}
            </div>
            <div class="achievement-status">${achievement.unlocked ? '✅' : '🔒'}</div>
        `;
        
        achievementsGrid.appendChild(achievementItem);
    });
    
    if (achievementsUnlocked) {
        achievementsUnlocked.textContent = unlockedCount;
    }
}

/* Visitor Counter */
function updateVisitorCount() {
    let visits = parseInt(localStorage.getItem('visitCount') || '0');
    visits++;
    localStorage.setItem('visitCount', visits.toString());
    
    const counter = document.getElementById('visit-count');
    if (counter) {
        counter.textContent = visits;
    }
    
    if (visits === 1) {
        unlockAchievement('visitor');
    }
}

/* Knowledge Search */
function initKnowledgeSearch() {
    const searchInput = document.getElementById('knowledge-search');
    const knowledgeList = document.getElementById('knowledge-list');
    
    if (!searchInput || !knowledgeList) return;
    
    const items = knowledgeList.querySelectorAll('li');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
}

/* Education Sorting */
function initEducationSorting() {
    const sortButtons = document.querySelectorAll('.sort-btn');
    const timeline = document.getElementById('education-timeline');
    
    if (!timeline) return;
    
    const items = Array.from(timeline.children);
    
    items.forEach((item, index) => {
        item.dataset.order = index;
    });
    
    sortButtons.forEach(button => {
        button.addEventListener('click', function() {
            sortButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const sortType = this.getAttribute('data-sort');
            
            if (sortType === 'date') {
                items.sort((a, b) => a.dataset.order - b.dataset.order);
            } else if (sortType === 'institution') {
                items.sort((a, b) => {
                    const instA = a.querySelector('h4').textContent;
                    const instB = b.querySelector('h4').textContent;
                    return instA.localeCompare(instB);
                });
            }
            
            items.forEach(item => timeline.appendChild(item));
        });
    });
}

/* Konami Code */
function initKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateKonamiMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateKonamiMode() {
    document.body.classList.toggle('konami-mode');
    unlockAchievement('konami');
    
    if (document.body.classList.contains('konami-mode')) {
        alert('🎮 ¡Modo Konami Activado! 🎮');
    }
}

/* Section Tracking */
const sectionsVisited = new Set();

function trackSectionVisit() {
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    sectionsVisited.add(section.id);
                    if (sectionsVisited.size >= sections.length - 1) {
                        unlockAchievement('explorer');
                    }
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(section);
    });
}

/* Easter Eggs */
function initEasterEggs() {
    const mainTitle = document.getElementById('main-title');
    let clickCount = 0;
    let clickTimer;
    
    if (mainTitle) {
        mainTitle.addEventListener('click', () => {
            clickCount++;
            clearTimeout(clickTimer);
            
            if (clickCount === 3) {
                alert('🎉 ¡Encontraste un easter egg! 🎉\n\nSigue explorando...');
                clickCount = 0;
            }
            
            clickTimer = setTimeout(() => { clickCount = 0; }, 500);
        });
    }
}

/* Main Initialization */
document.addEventListener('DOMContentLoaded', function () {
    actualizarEdad();
    initParticles();
    loadAchievements();
    renderAchievements();
    updateVisitorCount();
    initKnowledgeSearch();
    initEducationSorting();
    initKonamiCode();
    trackSectionVisit();
    initEasterEggs();
    
    setTimeout(() => unlockAchievement('reader'), 120000);
    
    /* Dark Mode */
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') body.classList.add('dark-mode');
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        if (theme === 'dark') unlockAchievement('darkMode');
    });
    
    /* Ripple Effects */
    document.querySelectorAll('button, .btn-primary, .filter-btn, .sort-btn, .project-link').forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    /* Social Achievement */
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', () => unlockAchievement('social'));
    });
    
    /* Scroll Animations */
    const revealElements = document.querySelectorAll('.reveal');
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            if (element.getBoundingClientRect().top < window.innerHeight - 100) {
                element.classList.add('active');
            }
        });
    }
    
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
    
    /* Counter Animation */
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    function animateCounters() {
        if (hasAnimated) return;
        const aboutSection = document.getElementById('sobre-mi');
        if (!aboutSection) return;
        
        if (aboutSection.getBoundingClientRect().top < window.innerHeight - 100) {
            hasAnimated = true;
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                let current = 0;
                const increment = target / 100;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                }, 20);
            });
        }
    }
    
    window.addEventListener('scroll', animateCounters);
    
    /* Project Filters */
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            document.querySelectorAll('.project-card').forEach(card => {
                const category = card.getAttribute('data-category');
                card.classList.toggle('hidden', filter !== 'all' && category !== filter);
            });
        });
    });
    
    /* Form Submission */
    const formularioContacto = document.getElementById('contact-form');
    if (formularioContacto) {
        formularioContacto.addEventListener('submit', function (event) {
            event.preventDefault();
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();
            const errorElemento = document.getElementById('form-error');
            const mensajeConfirmacion = document.getElementById('confirmation-message');
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!nombre || !email || !mensaje) {
                errorElemento.textContent = 'Por favor, completa todos los campos.';
                errorElemento.style.display = 'block';
            } else if (!emailRegex.test(email)) {
                errorElemento.textContent = 'Por favor, ingresa un email válido.';
                errorElemento.style.display = 'block';
            } else {
                errorElemento.style.display = 'none';
                mensajeConfirmacion.textContent = "Mensaje enviado con éxito.";
                mensajeConfirmacion.style.display = 'block';
                
                createConfetti();
                formularioContacto.reset();
                
                setTimeout(() => mensajeConfirmacion.style.display = 'none', 2000);
            }
        });
    }
    
    /* Navigation */
    document.querySelectorAll("#nav-section a").forEach(enlace => {
        enlace.addEventListener("click", function (event) {
            event.preventDefault();
            const destinoId = this.getAttribute("href").substring(1);
            const destinoElemento = document.getElementById(destinoId);
            if (destinoElemento) {
                window.scrollTo({
                    top: destinoElemento.offsetTop - 120,
                    behavior: "smooth"
                });
            }
            
            const navUl = document.querySelector('nav ul');
            const hamburger = document.getElementById('hamburger');
            if (navUl && navUl.classList.contains('active')) {
                navUl.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    /* Hamburger Menu */
    const hamburger = document.getElementById('hamburger');
    const navUl = document.querySelector('nav ul');
    
    if (hamburger && navUl) {
        hamburger.addEventListener('click', function() {
            navUl.classList.toggle('active');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
        });
    }
    
    /* Back to Top */
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    /* Scroll Progress */
    window.addEventListener('scroll', function() {
        const scrollProgress = document.getElementById('scroll-progress');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        if (scrollProgress) {
            const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
            scrollProgress.style.width = scrollPercentage + '%';
        }
        
        if (backToTopButton) {
            backToTopButton.classList.toggle('show', scrollTop > 300);
        }
    });
});