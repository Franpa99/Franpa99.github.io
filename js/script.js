document.getElementById('contact-form').addEventListener('submit', function (event) {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
    const errorElement = document.getElementById('form-error');
    if (!nombre || !email || !mensaje) {
        event.preventDefault();
        errorElement.style.display = 'block';
    } else {
        errorElement.style.display = 'none';
    }
});