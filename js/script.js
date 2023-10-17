document.addEventListener('DOMContentLoaded', function() {
    cargarDatos()
    .then(data => {
        manejarDatos(data);
    })
    .catch(error => console.error('Error:', error));
});
// JSON 
function cargarDatos() {
    return fetch('./data/productos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error de red: ${response.statusText}`);
            }
            return response.json();
        });
}

function manejarDatos(productos) {
    const swiperWrapper = document.querySelector('.swiper-wrapper');

    productos.forEach(producto => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        
        const contenido = `
            <div class="producto">
                <img src="./img/${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
            </div>
        `;

        slide.innerHTML = contenido;
        swiperWrapper.appendChild(slide);
    });

// Swipercarrusel


    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    //cantidades del simulador 
    document.getElementById('simuladorBebidas').addEventListener('submit', function(event) {
        event.preventDefault();

        const cocaColaCantidad = parseInt(document.querySelector('input[name="cantidadCocaCola"]').value) || 0;
        const pepsiCantidad = parseInt(document.querySelector('input[name="cantidadPepsi"]').value) || 0;
        const spriteCantidad = parseInt(document.querySelector('input[name="cantidadSprite"]').value) || 0;
        const fantaCantidad = parseInt(document.querySelector('input[name="cantidadFanta"]').value) || 0;

        //total
        let costoTotal = 0;
        costoTotal += 700 * cocaColaCantidad;
        costoTotal += 800 * pepsiCantidad;
        costoTotal += 900 * spriteCantidad;
        costoTotal += 800 * fantaCantidad;

        const totalElement = document.getElementById('total');
        totalElement.textContent = `El costo total de su pedido es $${costoTotal.toFixed(2)}`;

        localStorage.setItem('cantidadCocaCola', cocaColaCantidad.toString());
        localStorage.setItem('cantidadPepsi', pepsiCantidad.toString());
        localStorage.setItem('cantidadSprite', spriteCantidad.toString());
        localStorage.setItem('cantidadFanta', fantaCantidad.toString());
    });

    const cocaColaCantidad = localStorage.getItem('cantidadCocaCola');
    if (cocaColaCantidad) {
        document.querySelector('input[name="cantidadCocaCola"]').value = cocaColaCantidad;
    }

    const pepsiCantidad = localStorage.getItem('cantidadPepsi');
    if (pepsiCantidad) {
        document.querySelector('input[name="cantidadPepsi"]').value = pepsiCantidad;
    }

    const spriteCantidad = localStorage.getItem('cantidadSprite');
    if (spriteCantidad) {
        document.querySelector('input[name="cantidadSprite"]').value = spriteCantidad;
    }

    const fantaCantidad = localStorage.getItem('cantidadFanta');
    if (fantaCantidad) {
        document.querySelector('input[name="cantidadFanta"]').value = fantaCantidad;
    }
}
