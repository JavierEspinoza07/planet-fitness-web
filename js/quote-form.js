// Quote Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const quoteForm = document.getElementById('quoteForm');
    const quoteMessage = document.getElementById('quoteMessage');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('quoteName').value;
            const email = document.getElementById('quoteEmail').value;
            const phone = document.getElementById('quotePhone').value;
            const city = document.getElementById('quoteCity').value;
            const type = document.getElementById('quoteType').value;
            const space = document.getElementById('quoteSpace').value;
            
            if (!name || !email || !phone || !city || !type || !space) {
                showQuoteMessage('Por favor, complete todos los campos obligatorios.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showQuoteMessage('Por favor, ingrese un correo electrónico válido.', 'error');
                return;
            }
            
            // Collect equipment selections
            const equipmentCheckboxes = document.querySelectorAll('input[name="quoteEquipment"]:checked');
            if (equipmentCheckboxes.length === 0) {
                showQuoteMessage('Por favor, seleccione al menos un tipo de equipo de interés.', 'error');
                return;
            }
            
            // In a real application, you would send the form data to a server here
            // For now, we'll just show a success message
            showQuoteMessage('¡Gracias por tu solicitud de cotización! Hemos recibido tu información y te enviaremos una cotización detallada en menos de 24 horas.', 'success');
            
            // Reset form
            quoteForm.reset();
        });
    }
    
    function showQuoteMessage(text, type) {
        quoteMessage.textContent = text;
        quoteMessage.className = 'form-message ' + type;
        quoteMessage.style.display = 'block';
        
        // Scroll to message
        quoteMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide message after 8 seconds for quote forms (longer than contact)
        setTimeout(() => {
            quoteMessage.style.display = 'none';
        }, 8000);
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});