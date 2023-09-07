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
    const confirmationMessage = document.getElementById('confirmation-message');
    if (!nombre || !email || !mensaje) {
        event.preventDefault();
        errorElement.style.display = 'block';
    } else {
        errorElement.style.display = 'none';
        if (mensaje === "666") {
            /* Cambiar el archivo de audio a "666.mp3" */
            changeAudioSource("audio/666.mp3");
        }
        /* Muestra el mensaje de confirmación con estilo y animación */
        confirmationMessage.textContent = "Mensaje enviado con éxito.";
        confirmationMessage.style.backgroundColor = "#ff9900";
        confirmationMessage.style.color = "#000";
        confirmationMessage.style.display = 'block';
        /* Evita que se envíe el formulario */
        event.preventDefault();
        /* Después de 2 segundos, oculta el mensaje de confirmación */
        setTimeout(function() {
            confirmationMessage.style.display = 'none';
        }, 2000);
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
    if (audio.muted) {
        audio.muted = false;
        muteButton.style.backgroundImage = `url(images/sound_on.png)`;
        muteButton.textContent = "Silenciar";
    } else {
        audio.muted = true;
        muteButton.style.backgroundImage = `url(images/sound_off.png)`;
        muteButton.textContent = "";
    }
}

/* Agregamos un evento clic al botón de silencio */
muteButton.addEventListener("click", toggleMute);

/* Inicialmente, establece la imagen del botón según el estado de audio */
if (audio.muted) {
    muteButton.style.backgroundImage = `url(${speakerOffImage})`;
} else {
    muteButton.style.backgroundImage = `url(${speakerOnImage})`;
}

function changeAudioSource(newSource) {
    const audioSource = document.getElementById("audioSource");
    audioSource.src = newSource;
    audio.load();
    audio.play();
}

document.addEventListener("DOMContentLoaded", function() {
    const loadingOverlay = document.getElementById("loading-overlay");
    const enterButton = document.getElementById("enter-button");
    /* Cuando se hace clic en el botón "Entrar" */
    enterButton.addEventListener("click", function() {
        loadingOverlay.style.opacity = "0";
        enterButton.style.opacity = "0";
        setTimeout(function () {
            loadingOverlay.style.display = "none";
        }, 1000);
        /* Reproducir el audio */
        const audio = document.getElementById("myAudio");
        if (audio) {
            audio.play();
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll("#nav-section a");
    navLinks.forEach(function(link) {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const offset = 120;
                const targetOffsetTop = targetElement.offsetTop - offset;
                window.scrollTo({
                    top: targetOffsetTop,
                    behavior: "smooth"
                });
            }
        });
    });
});