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

/* Obtenemos el elemento de audio y el botón de silencio */
var audio = document.getElementById("myAudio");
var muteButton = document.getElementById("muteButton");

/* Imágenes del parlante encendido y apagado */
var speakerOnImage = "images/sound_on.png";
var speakerOffImage = "images/sound_off.png";

/* Función para alternar entre silenciar y reanudar la música */
function toggleMute() {
    if (audio.paused) {
        audio.play();
        muteButton.style.backgroundImage = `url(images/sound_on.png)`;
        muteButton.textContent = "";
    } else {
        audio.pause();
        muteButton.style.backgroundImage = `url(images/sound_off.png)`;
        muteButton.textContent = "";
    }
}

/* Agregamos un evento clic al botón de silencio */
muteButton.addEventListener("click", toggleMute);

/* Inicialmente, establece la imagen del botón según el estado de audio */
if (audio.paused) {
    muteButton.style.backgroundImage = `url(${speakerOffImage})`;
} else {
    muteButton.style.backgroundImage = `url(${speakerOnImage})`;
}