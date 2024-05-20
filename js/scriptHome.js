// Archivo scriptHome.js
document.addEventListener('DOMContentLoaded', () => {
    // Barra de navegación
    const cerrarSesionLink = document.getElementById('cerrar-sesion');

    // Evento de clic en el enlace "Cerrar Sesión"
    if (cerrarSesionLink) {
        cerrarSesionLink.addEventListener('click', () => {
            cerrarSesion();
        });
    }

    // Función para cerrar la sesión
    function cerrarSesion() {
        localStorage.removeItem('sesion');
        localStorage.removeItem('nuevo-nombre'); // Eliminar el nombre de usuario del localStorage
        alert('Sesión cerrada correctamente');
        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = "login.html";
    }  

    // Obtener el nombre del usuario del localStorage
    const nombreUsuario = localStorage.getItem('nuevo-nombre');

    // Verificar si se encontró un nombre de usuario en el localStorage
    if (nombreUsuario) {
        // Mostrar el nombre del usuario en el span correspondiente
        document.getElementById('nuevo-nombre').textContent = nombreUsuario;
    }
});
