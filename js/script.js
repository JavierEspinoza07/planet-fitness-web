document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    const body = document.body;
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const faqItems = document.querySelectorAll('.faq-item');
    const forms = document.querySelectorAll('form');
    
    // ========== MENÚ MÓVIL ==========
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
            
            // Cambiar ícono
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
            
            // Bloquear scroll cuando menú está abierto
            body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Cerrar menú al hacer click en enlace
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.replace('fa-times', 'fa-bars');
                body.style.overflow = '';
            });
        });
        
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', function(event) {
            if (!mainNav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                mainNav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon.classList.contains('fa-times')) {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
                body.style.overflow = '';
            }
        });
    }
    
    // ========== FAQ ACCORDION ==========
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                // Cerrar otros items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Alternar item actual
                item.classList.toggle('active');
            });
        }
    });
    
    // ========== FORM VALIDATION ==========
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            let firstInvalidField = null;
            
            requiredFields.forEach(field => {
                field.style.borderColor = '';
                
                if (!field.value.trim()) {
                    field.style.borderColor = 'var(--burgundy)';
                    isValid = false;
                    
                    if (!firstInvalidField) {
                        firstInvalidField = field;
                    }
                }
            });
            
            if (!isValid) {
                if (firstInvalidField) {
                    firstInvalidField.focus();
                }
                showMessage(form, 'Por favor, complete todos los campos requeridos.', 'error');
                return;
            }
            
            // Simular envío (reemplazar con tu lógica real)
            showMessage(form, '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.', 'success');
            
            // Resetear formulario después de 3 segundos
            setTimeout(() => {
                form.reset();
                const message = form.querySelector('.form-message');
                if (message) {
                    message.style.display = 'none';
                }
            }, 3000);
        });
        
        // Limpiar validación al escribir
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.style.borderColor = '';
            });
        });
    });
    
    // ========== STICKY HEADER ==========
    let lastScroll = 0;
    const header = document.querySelector('.main-header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.style.boxShadow = 'none';
                return;
            }
            
            if (currentScroll > lastScroll && currentScroll > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
                header.style.boxShadow = 'var(--shadow-lg)';
            }
            
            lastScroll = currentScroll;
        });
    }
    
    // ========== ANIMACIONES AL SCROLL ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animar
    const elementsToAnimate = document.querySelectorAll('.advantage-card, .category-card, .testimonial-card, .service-card');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
    
    // ========== LOADING STATE PARA BOTONES ==========
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.type === 'submit') {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 2000);
            }
        });
    });
    
    // ========== SMOOTH SCROLL PARA ANCHORS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== FUNCIONES AUXILIARES ==========
    function showMessage(form, text, type) {
        let messageContainer = form.querySelector('.form-message');
        
        if (!messageContainer) {
            messageContainer = document.createElement('div');
            messageContainer.className = 'form-message';
            form.appendChild(messageContainer);
        }
        
        messageContainer.textContent = text;
        messageContainer.className = `form-message ${type}`;
        messageContainer.style.display = 'block';
        
        messageContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // ========== INICIALIZAR CONTADORES ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        const suffix = stat.textContent.replace(/[0-9]/g, '');
        
        if (!isNaN(target)) {
            animateCounter(stat, target, suffix);
        }
    });
    
    function animateCounter(element, target, suffix) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 40);
    }
    
    // ========== DETECCIÓN DE DISPOSITIVO ==========
    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
    
    if (isTouchDevice()) {
        document.documentElement.classList.add('touch-device');
    } else {
        document.documentElement.classList.add('no-touch-device');
    }
});