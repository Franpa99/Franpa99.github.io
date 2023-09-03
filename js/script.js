function ageCalculator() {
    const dob = new Date("1999-11-05");
    const currentDate = new Date();
    /* Calcula la diferencia en años entre la fecha de nacimiento y la fecha actual */
    let age = currentDate.getFullYear() - dob.getFullYear();
    /* Verifica si el cumpleaños ya ha ocurrido este año */
    if (currentDate.getMonth() < dob.getMonth() || (currentDate.getMonth() === dob.getMonth() && currentDate.getDate() < dob.getDate())) {
        age--;
    }
    /* Muestra la edad en el encabezado */
    const header = document.querySelector('header');
    header.innerHTML = `<h1>Francisco Parietti Morixe</h1>
                        <p>¡Hola! Soy Francisco, un apasionado del desarrollo web, desarrollo de videojuegos y fútbol de ${age} años, oriundo de Montevideo, Uruguay.</p>`;
}

/* Llama a la función al cargar la página para mostrar la edad en el encabezado */
ageCalculator();

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