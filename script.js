 // Temporizador
 const countdown = () => {
    const countDate = new Date("Nov 29, 2024 21:00:00").getTime();
    const now = new Date().getTime();
    const gap = countDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(gap / day);
    const hours = Math.floor((gap % day) / hour);
    const minutes = Math.floor((gap % hour) / minute);
    const seconds = Math.floor((gap % minute) / second);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
};

setInterval(countdown, 1000);

//funcion animacion de martina
document.addEventListener("DOMContentLoaded", function () {
    document
        .getElementById("mostrarMapa")
        .addEventListener("click", function (event) {
            event.preventDefault();
            var mapa = document.getElementById("mapa");
            if (mapa.style.display === "none") {
                mapa.style.display = "block";
            } else {
                mapa.style.display = "none";
            }
        });
});
 //funcion subir fotos de la fiesta
 const uploadedFiles = [];

document.getElementById('upload-button').addEventListener('click', async () => {
const fileInput = document.getElementById('file-upload');
const file = fileInput.files[0];

// Verificar si se ha seleccionado un archivo
if (!file) {
alert("Por favor, selecciona un archivo antes de subir.");
return;
}

// Verificar si ya se ha subido un archivo con el mismo nombre y tamaño
const isDuplicate = uploadedFiles.some(uploadedFile => 
uploadedFile.name === file.name && uploadedFile.size === file.size
);

if (isDuplicate) {
alert("Este archivo ya ha sido subido.");
return;
}

const url = `https://api.cloudinary.com/v1_1/dobqfyqvx/image/upload`; // Reemplaza YOUR_CLOUD_NAME
const formData = new FormData();
formData.append('file', file);
formData.append('upload_preset', 'ml_default'); // Usa el nombre de tu preset aquí

try {
// Enviar la solicitud a Cloudinary
const response = await fetch(url, {
    method: 'POST',
    body: formData
});

// Obtener la respuesta de Cloudinary
const data = await response.json();

// Verificar si se recibió la URL de la imagen
if (data.secure_url) {
    // Almacenar los detalles del archivo para evitar duplicados
    uploadedFiles.push({ name: file.name, size: file.size, url: data.secure_url });

    // Crear un elemento de imagen para previsualizar la foto subida
    const imgElement = document.createElement('img');
    imgElement.src = data.secure_url;
    imgElement.alt = 'Uploaded Photo';
    imgElement.style.cursor = 'pointer'; // Indicamos que es clicable
    imgElement.title = "Haz clic para ver en grande o doble clic para eliminar";

    // Evento para visualizar la imagen en tamaño grande (un solo clic)
    imgElement.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1000';

        const modalImage = document.createElement('img');
        modalImage.src = data.secure_url;
        modalImage.style.maxWidth = '90%';
        modalImage.style.maxHeight = '90%';

        // Cerrar el modal al hacer clic fuera de la imagen
        modal.addEventListener('click', () => {
            modal.remove();
        });

        modal.appendChild(modalImage);
        document.body.appendChild(modal);
    });

    // Evento para eliminar la imagen al hacer doble clic
    imgElement.addEventListener('dblclick', () => {
        const confirmDelete = confirm("¿Estás seguro de que deseas eliminar esta imagen?");
        if (confirmDelete) {
            // Eliminar la imagen del DOM
            imgElement.remove();

            // Eliminar la imagen del arreglo uploadedFiles
            const index = uploadedFiles.findIndex(uploadedFile => uploadedFile.url === data.secure_url);
            if (index > -1) {
                uploadedFiles.splice(index, 1); // Eliminamos la imagen del arreglo
            }

            alert("Imagen eliminada.");
        }
    });

    // Añadir la imagen al contenedor de previsualización
    document.getElementById('photos-preview').appendChild(imgElement);

    // Temporizador para eliminar la imagen después de 10 segundos (10000 ms)
    setTimeout(() => {
        // Verificar si la imagen sigue en el DOM
        if (imgElement.parentNode) {
            imgElement.remove(); // Eliminar la imagen del DOM

            // También eliminamos la imagen del arreglo de archivos subidos
            const index = uploadedFiles.findIndex(uploadedFile => uploadedFile.url === data.secure_url);
            if (index > -1) {
                uploadedFiles.splice(index, 1); // Eliminamos la imagen del arreglo
            }
        }
    }, 40000); // 40 segundos
}
} catch (error) {
console.error("Error al subir la foto:", error);
alert("Error al subir la foto. Por favor, intenta de nuevo.");
}
});
//datos bancarios
document.getElementById('show-bank-details').addEventListener('click', () => {
const bankDetailsDiv = document.getElementById('bank-details');
const isVisible = bankDetailsDiv.style.display === 'block';

if (isVisible) {
bankDetailsDiv.style.display = 'none'; // Ocultar si ya está visible
} else {
bankDetailsDiv.style.display = 'block'; // Mostrar si está oculto
bankDetailsDiv.scrollIntoView({ behavior: 'smooth' }); // Desplazarse hacia abajo
}
});
//limpiar campos del form
function handleSubmit(event) {
event.preventDefault();  // Evita el envío predeterminado para agregar la limpieza de campos
const form = event.target;

// Enviar el formulario manualmente
fetch(form.action, {
    method: form.method,
    body: new FormData(form),
    headers: {
        'Accept': 'application/json'
    }
}).then(response => {
    if (response.ok) {
        alert('Respuesta enviada con éxito');
        form.reset();  // Limpia todos los campos del formulario
    } else {
        alert('Hubo un problema al enviar el formulario');
    }
}).catch(error => {
    alert('Hubo un error al enviar la respuesta');
});

return false; // Prevenir el comportamiento por defecto
}