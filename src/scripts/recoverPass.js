// Función para buscar el usuario por correo electrónico
function buscarUsuario() {
    const correo = document.getElementById('correo').value; // Obtener el correo ingresado por el usuario
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []; // Obtener la lista de usuarios almacenados en localStorage

    // Verificar si se ingresó el correo electrónico
    if (!correo) {
        alert('Ingrese correo electrónico'); // Mostrar alerta si el campo de correo está vacío
        return;
    }

    // Buscar el usuario por correo electrónico
    const usuarioEncontrado = usuarios.find(usuario => usuario.email === correo);

    // Verificar si se encontró el usuario
    if (usuarioEncontrado) {
        // Mostrar la información del usuario
        document.getElementById('usuario').innerText = usuarioEncontrado.usuario;
        document.getElementById('nombre').innerText = usuarioEncontrado.nombre;
        document.getElementById('correoMostrar').innerText = usuarioEncontrado.email;
        document.getElementById('contraseña').innerText = usuarioEncontrado.password;
    } else {
        alert('El correo electrónico ingresado no está registrado'); // Mostrar alerta si no se encuentra el correo
        document.getElementById('correo').value = ''; // Limpiar el campo de correo
    }
}

// Función para limpiar los campos de entrada y los datos mostrados
function limpiarCampos() {
    document.getElementById('correo').value = ''; // Limpiar el campo de correo
    document.getElementById('usuario').innerText = ''; // Limpiar la información del usuario
    document.getElementById('nombre').innerText = ''; // Limpiar el nombre del usuario
    document.getElementById('correoMostrar').innerText = ''; // Limpiar el correo mostrado
    document.getElementById('contraseña').innerText = ''; // Limpiar la contraseña
}

// Función para regresar al login.html
function regresar() {
    window.location.href = "index.html"; // Redirigir a la página de login
}
