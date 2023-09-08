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

/* Función para cambiar la fuente de audio */
function changeAudioSource(newSource) {
    const audioSource = document.getElementById("audioSource");
    audioSource.src = newSource;
    const audio = document.getElementById("myAudio");
    audio.load();
    audio.play();
}

/* Función para reproducir o silenciar el audio */
function toggleSilenciar() {
    const audio = document.getElementById("myAudio");
    audio.muted = !audio.muted;
    const botonSilenciar = document.getElementById("muteButton");
    const imagenAlt = audio.muted ? "images/sound_off.png" : "images/sound_on.png";
    botonSilenciar.style.backgroundImage = `url(${imagenAlt})`;
    botonSilenciar.textContent = audio.muted ? "" : "Silenciar";
}

/* Función para actualizar la edad en el encabezado */
function actualizarEdad() {
    const edad = calcularEdad("1999-11-05");
    const encabezado = document.querySelector('header');
    encabezado.innerHTML = `
        <h1>Francisco Parietti Morixe</h1>
        <p>¡Hola! Soy Francisco, un apasionado del desarrollo web, desarrollo de videojuegos y fútbol de ${edad} años, oriundo de Montevideo, Uruguay.</p>
    `;
}

/* Evento al cargar la página */
document.addEventListener('DOMContentLoaded', function () {
    /* Actualizar la edad en el encabezado */
    actualizarEdad();
    /* Silenciar o reanudar el audio */
    const botonSilenciar = document.getElementById("muteButton");
    botonSilenciar.addEventListener("click", toggleSilenciar);
    /* Validación del formulario de contacto */
    const formularioContacto = document.getElementById('contact-form');
    formularioContacto.addEventListener('submit', function (event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('mensaje').value;
        const errorElemento = document.getElementById('form-error');
        const mensajeConfirmacion = document.getElementById('confirmation-message');
        if (!nombre || !email || !mensaje) {
            errorElemento.style.display = 'block';
        } else {
            errorElemento.style.display = 'none';
            if (email === "yami.sinsajo@gmail.com" || email === "yamilasilvacarro@gmail.com") {
                changeAudioSource("audio/rocketpowers.mp3");
            } else {
                if (mensaje === "666") {
                    changeAudioSource("audio/666.mp3");
                }
            }
            mensajeConfirmacion.textContent = "Mensaje enviado con éxito.";
            mensajeConfirmacion.style.backgroundColor = "#ff9900";
            mensajeConfirmacion.style.color = "#000";
            mensajeConfirmacion.style.display = 'block';
            setTimeout(function () {
                mensajeConfirmacion.style.display = 'none';
            }, 2000);
        }
    });
    /* Controlar el evento de clic en el botón "Entrar" */
    const overlayCarga = document.getElementById("loading-overlay");
    const botonEntrar = document.getElementById("enter-button");
    const audio = document.getElementById("myAudio");
    botonEntrar.addEventListener("click", function () {
        overlayCarga.style.opacity = "0";
        botonEntrar.style.opacity = "0";
        audio.play();
        setTimeout(function () {
            overlayCarga.style.display = "none";
        }, 1000);
    });
    /* Navegación suave al hacer clic en los enlaces de navegación */
    const enlacesNavegacion = document.querySelectorAll("#nav-section a");
    enlacesNavegacion.forEach(function (enlace) {
        enlace.addEventListener("click", function (event) {
            event.preventDefault();
            const destinoId = this.getAttribute("href").substring(1);
            const destinoElemento = document.getElementById(destinoId);
            if (destinoElemento) {
                const desplazamiento = 120;
                const posicionDestino = destinoElemento.offsetTop - desplazamiento;
                window.scrollTo({
                    top: posicionDestino,
                    behavior: "smooth"
                });
            }
        });
    });
});