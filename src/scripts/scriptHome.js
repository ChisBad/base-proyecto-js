document.addEventListener('DOMContentLoaded', () => {
    // Obtención de elementos del DOM
    const elements = {
        cerrarSesionLink: document.getElementById('cerrar-sesion'), // Enlace para cerrar sesión
        homeLink: document.getElementById('home'), // Enlace para la página de inicio
        whitesLink: document.getElementById('whites'), // Enlace para la página de vinos blancos
        redsLink: document.getElementById('reds'), // Enlace para la página de vinos tintos
        sparklingLink: document.getElementById('sparkling'), // Enlace para la página de vinos espumosos
        roseLink: document.getElementById('rose'), // Enlace para la página de vinos rosados
        dessertLink: document.getElementById('dessert'), // Enlace para la página de vinos de postre
        portLink: document.getElementById('port'), // Enlace para la página de vinos de Oporto
        dataContainer: document.getElementById('data-container'), // Contenedor para mostrar los datos de los vinos
        paginationContainer: document.getElementById('pagination-container'), // Contenedor para la paginación
        catalogTitle: document.getElementById('catalog-title') // Título del catálogo
    };

    // Definición de los endpoints de las APIs
    const apiEndpoints = {
        whites: 'https://api.sampleapis.com/wines/whites',
        reds: 'https://api.sampleapis.com/wines/reds',
        sparkling: 'https://api.sampleapis.com/wines/sparkling',
        rose: 'https://api.sampleapis.com/wines/rose',
        dessert: 'https://api.sampleapis.com/wines/dessert',
        port: 'https://api.sampleapis.com/wines/port'
    };

    // Lista de enlaces y sus endpoints correspondientes
    const links = [
        { element: elements.homeLink, endpoint: Object.values(apiEndpoints).join(','), isHome: true },
        { element: elements.whitesLink, endpoint: apiEndpoints.whites },
        { element: elements.redsLink, endpoint: apiEndpoints.reds },
        { element: elements.sparklingLink, endpoint: apiEndpoints.sparkling },
        { element: elements.roseLink, endpoint: apiEndpoints.rose },
        { element: elements.dessertLink, endpoint: apiEndpoints.dessert },
        { element: elements.portLink, endpoint: apiEndpoints.port }
    ];

    // Agregar evento de cierre de sesión si existe el enlace
    if (elements.cerrarSesionLink) {
        elements.cerrarSesionLink.addEventListener('click', cerrarSesion);
    }

    // Función para cerrar sesión
    function cerrarSesion() {
        // Mostrar una confirmación para cerrar sesión
        const confirmarCerrarSesion = confirm("¿Estás seguro de que quieres cerrar sesión?");
        
        // Si el usuario confirma el cierre de sesión, eliminar los datos del almacenamiento local y redirigir a la página de inicio de sesión
        if (confirmarCerrarSesion) {
            localStorage.removeItem('sesion'); // Elimina la sesión del almacenamiento local
            localStorage.removeItem('nuevo-nombre'); // Elimina el nombre del usuario del almacenamiento local
            alert('Sesión cerrada correctamente'); // Muestra un mensaje de confirmación
            window.location.href = "index.html"; // Redirige a la página de inicio de sesión
        }
    }

    // Mostrar el nombre del usuario almacenado en localStorage
    const nombreUsuario = localStorage.getItem('nuevo-nombre');
    if (nombreUsuario) {
        document.getElementById('nuevo-nombre').textContent = nombreUsuario;
    }

    const pageSize = 10 // Tamaño de la página para la paginación
    let currentPage = 1; // Página actual
    let currentData = []; // Datos actuales

// Función para obtener datos de la API
async function fetchData(endpoint, isHome = false) {
    elements.dataContainer.innerHTML = 'Cargando...'; // Muestra mensaje de carga
    // Verificar si el elemento catalogTitle existe antes de intentar acceder a su estilo
    if (elements.catalogTitle) {
        // Mostrar el título si es la página de inicio o si se proporciona como argumento
        elements.catalogTitle.style.display = isHome || endpoint === '' ? 'block' : 'none'; 
    }
    document.body.classList.toggle('home', isHome);
    let data = [];
    if (isHome) {
        const endpoints = endpoint ? endpoint.split(',') : Object.values(apiEndpoints);
        const fetchPromises = endpoints.map(url => fetch(url).then(response => response.json()));
        const allData = await Promise.all(fetchPromises);
        data = allData.flat();
    } else {
        const response = await fetch(endpoint);
        data = await response.json();
    }
    currentData = data;
    displayData(currentData, currentPage); // Mostrar los datos en la página actual
}

    // Función para mostrar los datos en la página
    function displayData(data, page) {
        elements.dataContainer.innerHTML = ''; // Limpiar el contenedor de datos
        const start = (page - 1) * pageSize; // Índice de inicio de los datos a mostrar
        const end = start + pageSize; // Índice de fin de los datos a mostrar
        const paginatedData = data.slice(start, end); // Obtener los datos para la página actual

        paginatedData.forEach(item => {
            const wineItem = document.createElement('div');
            wineItem.className = 'wine-item';
            wineItem.innerHTML = `
                <div class="wine-details">
                    <img src="${item.image}" alt="${item.wine}" />
                    <h3>${item.wine}</h3>
                </div>
                <div class="wine-info">
                    <div>
                        <p>Vino: ${item.winery}</p>
                        <p>Desde: ${item.location}</p>
                    </div>
                    <div class="ratings">
                        <span>Reseñas ${item.rating.reviews}</span>
                        <span>Clasificación ${item.rating.average}</span>
                    </div>
                </div>
            `;
            elements.dataContainer.appendChild(wineItem);
        });
        

        displayPagination(data.length, page); // Mostrar la paginación
    }

    // Función para mostrar la paginación
    function displayPagination(totalItems, currentPage) {
        elements.paginationContainer.innerHTML = ''; // Limpiar el contenedor de paginación
        const totalPages = Math.ceil(totalItems / pageSize); // Calcular el número total de páginas
        const maxPagesToShow = 10; // Número máximo de páginas a mostrar
        const halfPagesToShow = Math.floor(maxPagesToShow / 2); // Mitad del número de páginas a mostrar
        let startPage = currentPage - halfPagesToShow; // Página de inicio
        let endPage = currentPage + halfPagesToShow; // Página de fin

        // Ajustar la página de inicio y fin si están fuera de los límites
        if (startPage < 1) {
            startPage = 1;
            endPage = maxPagesToShow;
        }
        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = totalPages - maxPagesToShow + 1;
            if (startPage < 1) startPage = 1;
        }

        // Crear botón de inicio
        const startButton = createPageButton('◀', 1);
        elements.paginationContainer.appendChild(startButton);

        // Crear botones para cada página dentro del rango
        for (let i = startPage; i <= endPage; i++) {
            const pageButton = createPageButton(i, i, i === currentPage ? 'active' : '');
            elements.paginationContainer.appendChild(pageButton);
        }

        // Crear botón de fin
        const endButton = createPageButton('▶', totalPages);
        elements.paginationContainer.appendChild(endButton);
    }

    // Función para crear un botón de página
    function createPageButton(text, page, extraClass = '') {
        const button = document.createElement('button');
        button.className = `page-button ${extraClass}`; // Clase CSS para el estilo del botón
        button.textContent = text; // Texto del botón
        button.addEventListener('click', () => { // Evento click para cambiar de página
            currentPage = page;
            displayData(currentData, currentPage);
        });
        return button;
    }

    // Añadir eventos click a cada enlace para obtener y mostrar datos
    links.forEach(link => {
        link.element.addEventListener('click', () => {
            currentPage = 1;
            fetchData(link.endpoint, link.isHome);
        
            // Eliminar la clase 'active' de todos los enlaces
            links.forEach(link => link.element.classList.remove('active'));
        
            // Agregar la clase 'active' solo al enlace seleccionado
            link.element.classList.add('active');
        });
    });

    // Cargar los datos de inicio al cargar la página
    fetchData(Object.values(apiEndpoints).join(','), true);
});