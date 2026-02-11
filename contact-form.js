// contact-form.js - Validación mejorada de contacto
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    // Configurar máscara para teléfono
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                value = '+591 ' + value;
            }
            
            e.target.value = value;
        });
    }
    
    // Validación en tiempo real
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
    
    // Envío del formulario
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validar todos los campos
        let isValid = true;
        const fields = contactForm.querySelectorAll('[required]');
        
        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showMessage('Por favor, corrija los errores en el formulario.', 'error');
            return;
        }
        
        // Mostrar estado de carga
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        try {
            // Aquí iría tu lógica de envío real
            // Por ahora simulamos una respuesta
            await simulateFormSubmit();
            
            // Éxito
            showMessage('¡Mensaje enviado con éxito! Nos pondremos en contacto en menos de 24 horas.', 'success');
            contactForm.reset();
            
            // Enviar a WhatsApp también (opcional)
            sendWhatsAppBackup();
            
        } catch (error) {
            showMessage('Error al enviar el mensaje. Por favor, intente nuevamente.', 'error');
        } finally {
            // Restaurar botón
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
    
    // Funciones de validación
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Limpiar error previo
        clearFieldError(field);
        
        // Validaciones específicas
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Por favor, ingrese un email válido.';
                isValid = false;
            }
        }
        
        if (field.id === 'phone' && value) {
            const digits = value.replace(/\D/g, '');
            if (digits.length < 8) {
                errorMessage = 'El teléfono debe tener al menos 8 dígitos.';
                isValid = false;
            }
        }
        
        if (field.hasAttribute('required') && !value) {
            errorMessage = 'Este campo es requerido.';
            isValid = false;
        }
        
        // Mostrar error si existe
        if (!isValid) {
            showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        field.style.borderColor = 'var(--burgundy)';
        
        // Crear elemento de error si no existe
        let errorElement = field.parentNode.querySelector('.field-error');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.style.cssText = `
                color: var(--burgundy);
                font-size: 0.85rem;
                margin-top: 5px;
                display: flex;
                align-items: center;
                gap: 5px;
            `;
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    }
    
    function clearFieldError(field) {
        field.style.borderColor = '';
        
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    function showMessage(text, type) {
        let messageContainer = document.getElementById('formMessage');
        
        if (!messageContainer) {
            messageContainer = document.createElement('div');
            messageContainer.id = 'formMessage';
            contactForm.appendChild(messageContainer);
        }
        
        messageContainer.textContent = text;
        messageContainer.className = `form-message ${type}`;
        messageContainer.style.display = 'block';
        
        // Scroll al mensaje
        messageContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-ocultar después de 5 segundos
        if (type === 'success') {
            setTimeout(() => {
                messageContainer.style.display = 'none';
            }, 5000);
        }
    }
    
    function simulateFormSubmit() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simular 90% de éxito
                Math.random() > 0.1 ? resolve() : reject();
            }, 1500);
        });
    }
    
    function sendWhatsAppBackup() {
        const name = document.getElementById('name')?.value || '';
        const phone = document.getElementById('phone')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const subject = document.getElementById('subject')?.value || '';
        const message = document.getElementById('message')?.value || '';
        
        if (!name || !phone) return;
        
        const whatsappMessage = `*NUEVO CONTACTO WEB*\n\n` +
                               `*Nombre:* ${name}\n` +
                               `*Teléfono:* ${phone}\n` +
                               `*Email:* ${email}\n` +
                               `*Asunto:* ${subject}\n` +
                               `*Mensaje:* ${message}\n\n` +
                               `*Fecha:* ${new Date().toLocaleString('es-BO')}`;
        
        // Esto sería para enviar a un webhook o API
        console.log('Backup WhatsApp:', whatsappMessage);
    }
});