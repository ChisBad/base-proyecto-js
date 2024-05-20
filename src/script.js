document.addEventListener('DOMContentLoaded', () => {
  // Formularios
  const loginButton = document.getElementById('login-button');
  const registerButton = document.getElementById('register-button');
  const registerUserButton = document.getElementById('register-user');
  // Barra de navegación
  const cerrarSesionLink = document.getElementById('cerrar-sesion');


  // Evento de envío del formulario de inicio de sesión
  if (loginButton) {
    loginButton.addEventListener('click', () => {
      const usuario = document.getElementById('usuario').value;
      const password = document.getElementById('contraseña').value;
      iniciarSesion(usuario, password);
    });
  }

  // Evento de click del botón Registrarse
  if (registerButton) {
    registerButton.addEventListener('click', () => {
      window.location.href = "register.html";
    });
  }

  // Evento de click del botón Registrar Usuario
  if (registerUserButton) {
    registerUserButton.addEventListener('click', () => {
      const nuevoUsuario = {
        usuario: document.getElementById('nuevo-usuario').value,
        email: document.getElementById('correo').value,
        password: document.getElementById('nueva-contraseña').value,
        confirmPassword: document.getElementById('confirmar-contraseña').value
      };

      registrarUsuario(nuevoUsuario);
    });
  }

  // Función de inicio de sesión
  function iniciarSesion(usuario, password) {
    if (!usuario) {
      alert('Ingrese el usuario para acceder');
      return;
    }

    // Datos de prueba
    const adminUser = {
      usuario: 'admin',
      password: 'admin123',
      nombre: 'Admin',
      avatar: 'https://via.placeholder.com/150'
    };

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (usuario === adminUser.usuario) {
      if (password === adminUser.password) {
          localStorage.setItem('sesion', JSON.stringify({ estado: 'Iniciado', usuario: adminUser }));
          localStorage.setItem('nombreUsuario', adminUser.nombre); // Guardar el nombre de usuario en localStorage
          console.log("Inicio de sesión exitoso");
          window.location.href = "home.html";
      } else {
          alert('Contraseña incorrecta');
          document.getElementById('contraseña').value = '';
      }
      return;
  }

    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario);

    if (!usuarioEncontrado) {
      alert('Usuario no se encuentra registrado');
      document.getElementById('usuario').value = '';
      document.getElementById('contraseña').value = '';
  } else if (usuarioEncontrado.password !== password) {
      alert('Contraseña incorrecta');
      document.getElementById('contraseña').value = '';
  } else {
        localStorage.setItem('sesion', JSON.stringify({ estado: 'Iniciado', usuario: usuarioEncontrado }));
        localStorage.setItem('nombreUsuario', usuarioEncontrado.nombre); // Guardar el nombre de usuario en localStorage
        console.log("Inicio de sesión exitoso");
        window.location.href = "home.html";
  }
  }


// Función para mostrar el nombre de usuario en la página de inicio
function mostrarUsuario() {
  const nombreUsuario = localStorage.getItem('nombreUsuario');
  if (nombreUsuario) {
      const nombreUsuarioElem = document.getElementById('nombre-usuario');
      if (nombreUsuarioElem) {
          nombreUsuarioElem.innerText = nombreUsuario;
      } else {
          console.error('Elemento con ID nombre-usuario no encontrado');
      }
  } else {
      console.error('Nombre de usuario no encontrado en localStorage');
  }
}
  
  // Función de registro de usuario
  function registrarUsuario(nuevoUsuario) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Validar campos completos
    if (!nuevoUsuario.usuario || !nuevoUsuario.email || !nuevoUsuario.password || !nuevoUsuario.confirmPassword) {
      alert('Por favor complete todos los campos');
      return;
    }

    // Validar contraseña
    if (nuevoUsuario.password !== nuevoUsuario.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Validar usuario existente
    const usuarioExistente = usuarios.find(u => u.usuario === nuevoUsuario.usuario);
    if (usuarioExistente) {
      alert('El nombre de usuario ya está en uso');
      return;
    }

    // Guardar nuevo usuario
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('El usuario se registró correctamente');
    // Redirigir a la página de inicio de sesión
    window.location.href = "index.html";
  }

    // Evento de clic en el enlace "Cerrar Sesión"
  if (cerrarSesionLink) {
    cerrarSesionLink.addEventListener('click', () => {
      cerrarSesion();
    });
  }

  // Función para cerrar la sesión
  function cerrarSesion() {
    localStorage.removeItem('sesion');
    alert('Sesión cerrada correctamente');
    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = "index.html";
  }

});