// Archivo scriptLogin.js
document.addEventListener('DOMContentLoaded', () => {
    // Botones de formulario
    const loginButton = document.getElementById('login-button'); // Botón de login
    const registerButton = document.getElementById('register-button'); // Botón de registro

    // Evento de click del botón de inicio de sesión
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            const usuario = document.getElementById('usuario').value; // Valor del campo usuario
            const password = document.getElementById('contraseña').value; // Valor del campo contraseña
            iniciarSesion(usuario, password); // Llamada a la función iniciar sesión
        });
    }

    // Evento de click del botón de registro
    if (registerButton) {
        registerButton.addEventListener('click', () => {
            window.location.href = "register.html"; // Redirige a la página de registro
        });
    }

    // Función de inicio de sesión
    function iniciarSesion(usuario, password) {
        if (!usuario) {
            alert('Ingrese el usuario para acceder'); // Alerta si el usuario está vacío
            return;
        }

        // Datos de prueba para administrador
        const adminUser = {
            usuario: 'admin',
            password: 'admin123',
            nombre: 'Administrador',
            avatar: 'https://via.placeholder.com/150'
        };

        // Obtiene los usuarios almacenados en localStorage
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Verifica las credenciales del administrador
        if (usuario === adminUser.usuario) {
            if (password === adminUser.password) {
                localStorage.setItem('sesion', JSON.stringify({ estado: 'Iniciado', usuario: adminUser })); // Guarda la sesión del administrador
                console.log("Inicio de sesión exitoso");
                localStorage.setItem('nuevo-nombre', adminUser.nombre); // Guardar el nombre de usuario en localStorage
                window.location.href = "home.html"; // Redirige a la página de inicio
            } else {
                alert('Contraseña incorrecta'); // Alerta si la contraseña es incorrecta
                document.getElementById('contraseña').value = ''; // Limpia el campo contraseña
            }
            return;
        }

        // Busca el usuario en la lista de usuarios
        const usuarioEncontrado = usuarios.find(u => u.usuario === usuario);

        // Verifica si el usuario no está registrado
        if (!usuarioEncontrado) {
            alert('Usuario no se encuentra registrado'); // Alerta si el usuario no está registrado
            document.getElementById('usuario').value = ''; // Limpia el campo usuario
            document.getElementById('contraseña').value = ''; // Limpia el campo contraseña
        } else if (usuarioEncontrado.password !== password) {
            alert('Contraseña incorrecta'); // Alerta si la contraseña es incorrecta
            document.getElementById('contraseña').value = ''; // Limpia el campo contraseña
        } else {
            localStorage.setItem('sesion', JSON.stringify({ estado: 'Iniciado', usuario: usuarioEncontrado })); // Guarda la sesión del usuario
            console.log("Inicio de sesión exitoso");
            localStorage.setItem('nuevo-nombre', usuarioEncontrado.nombre); // Guardar el nombre de usuario en localStorage
            window.location.href = "home.html"; // Redirige a la página de inicio
        }
    }

});
