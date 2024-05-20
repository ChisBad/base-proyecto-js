// Archivo scriptRegister.js
document.addEventListener('DOMContentLoaded', () => {
    // Botón de registro de usuario
    const registerUserButton = document.getElementById('register-user');

    // Evento de click del botón Registrar Usuario
    if (registerUserButton) {
        registerUserButton.addEventListener('click', () => {
            const nuevoUsuario = {
                usuario: document.getElementById('nuevo-usuario').value, // Valor del campo usuario
                nombre: document.getElementById('nuevo-nombre').value, // Valor del campo nombre
                email: document.getElementById('correo').value, // Valor del campo correo
                password: document.getElementById('nueva-contraseña').value, // Valor del campo contraseña
                confirmPassword: document.getElementById('confirmar-contraseña').value // Valor del campo confirmar contraseña
            };

            registrarUsuario(nuevoUsuario); // Llamada a la función registrar usuario
        });
    }

    // Función de registro de usuario
    function registrarUsuario(nuevoUsuario) {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []; // Obtiene los usuarios almacenados en localStorage

        // Validar campos completos
        if (!nuevoUsuario.usuario || !nuevoUsuario.nombre || !nuevoUsuario.email || !nuevoUsuario.password || !nuevoUsuario.confirmPassword) {
            alert('Por favor complete todos los campos'); // Alerta si algún campo está vacío
            return;
        }

        // Validar contraseña
        if (nuevoUsuario.password !== nuevoUsuario.confirmPassword) {
            alert('Las contraseñas no coinciden'); // Alerta si las contraseñas no coinciden
            return;
        }

        // Validar usuario existente
        const usuarioExistente = usuarios.find(u => u.usuario === nuevoUsuario.usuario);
        if (usuarioExistente) {
            alert('El nombre de usuario ya está en uso'); // Alerta si el usuario ya existe
            return;
        }

        // Guardar nuevo usuario
        usuarios.push(nuevoUsuario); // Agrega el nuevo usuario a la lista
        localStorage.setItem('usuarios', JSON.stringify(usuarios)); // Guarda la lista actualizada en localStorage
        alert('El usuario se registró correctamente'); // Alerta de éxito
        window.location.href = "login.html"; // Redirige a la página de inicio de sesión
    }
});
