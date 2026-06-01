// =========================
// CARGAR TODOS LOS PRODUCTOS
// =========================

function cargarProductos() {

    const productList = document.querySelector('.api');

    // Si la página no tiene la lista de productos, salir
    if (!productList) {
        return;
    }

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {

            productList.innerHTML = '';

            data.forEach(product => {

                const li = document.createElement('li');

                li.innerHTML = `
                    <a class="producto-link" href="detalle.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.title}">
                        <h3>${product.title}</h3>
                        <p>Precio: $${product.price}</p>
                    </a>

                    <button onclick="addToCart(${product.id})">
                        Agregar al carrito
                    </button>
                `;

                productList.appendChild(li);

            });

        })
        .catch(error => {

            console.error('Error al cargar los productos:', error);

            productList.innerHTML =
                '<p>Hubo un error al cargar los productos.</p>';

        });

}


// =========================
// PRODUCTOS DESTACADOS HOME
// =========================

function cargarProductosDestacados() {

    const lista = document.querySelector('.productos-destacados');

    if (!lista) {
        return;
    }

    fetch('https://fakestoreapi.com/products?limit=4')
        .then(response => response.json())
        .then(data => {

            lista.innerHTML = '';

            data.forEach(product => {

                const li = document.createElement('li');

                li.innerHTML = `
                    <a class="producto-link" href="pages/detalle.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.title}" width="100">
                        <h3>${product.title}</h3>
                        <p>$${product.price.toFixed(2)}</p>
                    </a>
                `;

                lista.appendChild(li);

            });

        })
        .catch(error => {

            console.error('Error al cargar productos destacados:', error);

            lista.innerHTML =
                '<p>Hubo un error al cargar los productos destacados.</p>';

        });

}


// =========================
// DETALLE DEL PRODUCTO
// =========================

function cargarDetalleProducto() {

    const contenedor = document.querySelector('#detalle-producto');

    if (!contenedor) {
        return;
    }

    // Obtener el ID desde la URL
    const parametros = new URLSearchParams(window.location.search);

    const id = parametros.get('id');

    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(response => response.json())
        .then(producto => {

            contenedor.innerHTML = `
                <div class="detalle-contenido">

                    <div class="detalle-imagen">
                        <img src="${producto.image}" alt="${producto.title}">
                    </div>

                    <div class="detalle-info">

                        <h2>${producto.title}</h2>

                        <p class="precio">
                            $${producto.price.toFixed(2)}
                        </p>

                        <p>
                            <strong>Categoría:</strong>
                            ${producto.category}
                        </p>

                        <p>${producto.description}</p>

                        <button
                            class="btn-carrito"
                            onclick="addToCart(${producto.id})">

                            Agregar al carrito

                        </button>

                    </div>

                </div>
            `;

        })
        .catch(error => {

            console.error(error);

            contenedor.innerHTML =
                '<p>Error al cargar el producto.</p>';

        });

}


// =========================
// AGREGAR AL CARRITO
// =========================

function addToCart(idProducto) {

    console.log(
        'Producto agregado al carrito:',
        idProducto
    );

    alert('Producto agregado al carrito');

}


// =========================
// INICIO DE LA APLICACIÓN
// =========================

document.addEventListener('DOMContentLoaded', () => {

    cargarProductos();

    cargarProductosDestacados();

    cargarDetalleProducto();

});

