
// VARIABLES GLOBALES


let carrito =
    JSON.parse(localStorage.getItem("carrito")) || [];

let productos = [];



// PRODUCTOS


function cargarProductos() {

    const productList =
        document.querySelector('.api');

    if (!productList) {
        return;
    }

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {

            productos = data;

            mostrarProductos(data);

        })
        .catch(error => {

            console.error(
                'Error al cargar productos:',
                error
            );

            productList.innerHTML =
                '<p>Error al cargar productos.</p>';

        });

}

function mostrarProductos(listaProductos) {

    const productList =
        document.querySelector('.api');

    if (!productList) {
        return;
    }

    productList.innerHTML = '';

    listaProductos.forEach(product => {

        const li =
            document.createElement('li');

        li.innerHTML = `
            <a
                class="producto-link"
                href="detalle.html?id=${product.id}">

                <img
                    src="${product.image}"
                    alt="${product.title}">

                <h3>${product.title}</h3>

                <p>
    Precio: $${product.price.toFixed(2)}
</p>

            </a>

            <button
                onclick="addToCart(${product.id})">

                Agregar al carrito

            </button>
        `;

        productList.appendChild(li);

    });

}



// FILTRO CATEGORIAS
function cargarCategorias() {

    const filtro =
        document.querySelector('#filtroCategoria');

    if (!filtro) {
        return;
    }

    fetch('https://fakestoreapi.com/products/categories')
        .then(response => response.json())
        .then(categorias => {

            categorias.forEach(categoria => {

                const option =
                    document.createElement('option');

                option.value = categoria;
                option.textContent = categoria;

                filtro.appendChild(option);

            });

        })
        .catch(error => {

            console.error(
                'Error al cargar categorías:',
                error
            );

        });

}

function configurarFiltro() {

    const filtro =
        document.querySelector('#filtroCategoria');

    if (!filtro) {
        return;
    }

    filtro.addEventListener('change', () => {

        const categoria =
            filtro.value;

        if (categoria === "all") {

            mostrarProductos(productos);

        } else {

            const productosFiltrados =
                productos.filter(product =>
                    product.category === categoria
                );

            mostrarProductos(productosFiltrados);

        }

    });

}



// PRODUCTOS DESTACADOS


function cargarProductosDestacados() {

    const lista =
        document.querySelector('.productos-destacados');

    if (!lista) {
        return;
    }

    fetch('https://fakestoreapi.com/products?limit=4')
        .then(response => response.json())
        .then(data => {

            lista.innerHTML = '';

            data.forEach(product => {

                const li =
                    document.createElement('li');

                li.innerHTML = `
                    <a
                        class="producto-link"
                        href="pages/detalle.html?id=${product.id}">

                        <img
                            src="${product.image}"
                            alt="${product.title}"
                            width="100">

                        <h3>${product.title}</h3>

                        <p>
                            $${product.price.toFixed(2)}
                        </p>

                    </a>
                `;

                lista.appendChild(li);

            });

        })
        .catch(error => {

            console.error(
                'Error al cargar destacados:',
                error
            );

        });

}



// DETALLE PRODUCTO


function cargarDetalleProducto() {

    const contenedor =
        document.querySelector('#detalle-producto');

    if (!contenedor) {
        return;
    }

    const parametros =
        new URLSearchParams(window.location.search);

    const id =
        parametros.get('id');

    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(response => response.json())
        .then(producto => {

            contenedor.innerHTML = `
                <div class="detalle-contenido">

                    <div class="detalle-imagen">
                        <img
                            src="${producto.image}"
                            alt="${producto.title}">
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

                        <p>
                            ${producto.description}
                        </p>

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
                '<p>Error al cargar producto.</p>';

        });

}


// CARRITO


function addToCart(idProducto) {

    carrito.push(idProducto);

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    alert("Producto agregado al carrito");

}

function cargarCarrito() {

    const contenedor =
        document.querySelector('#cargarCarrito');

    const cantidad =
        document.querySelector('#cantidad-productos');

    const totalTexto =
        document.querySelector('#total-carrito');

    if (!contenedor) {
        return;
    }

    contenedor.innerHTML = '';

    let total = 0;

    if (carrito.length === 0) {

        contenedor.innerHTML =
            '<h2>Tu carrito está vacío</h2>';

        if (cantidad) {
            cantidad.textContent =
                'Cantidad de productos: 0';
        }

        if (totalTexto) {
            totalTexto.textContent =
                'Total: $0';
        }

        return;

    }

    carrito.forEach(id => {

        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(response => response.json())
            .then(producto => {

                total += producto.price;

                const div =
                    document.createElement('div');

                div.classList.add('item-carrito');

                div.innerHTML = `
               <button
    class="btn-eliminar"
    onclick="eliminarProducto(${producto.id})">

    Eliminar

</button>
                    <img
                        src="${producto.image}"
                        alt="${producto.title}">

                    <div class="info-carrito">

                        <h3>${producto.title}</h3>

                        <p>
                            Precio:
                            $${producto.price.toFixed(2)}
                        </p>

                    </div>
                `;

                contenedor.appendChild(div);

                if (cantidad) {

                    cantidad.textContent =
                        `Cantidad de productos: ${carrito.length}`;

                }

                if (totalTexto) {

                    totalTexto.textContent =
                        `Total: $${total.toFixed(2)}`;

                }

            });

    });

}

function limpiarCarrito() {

    carrito = [];

    localStorage.removeItem("carrito");

    cargarCarrito();

    alert("Carrito vaciado");

}


function eliminarProducto(idProducto) {

    const indice =
        carrito.indexOf(idProducto);

    if (indice !== -1) {

        carrito.splice(indice, 1);

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );

        cargarCarrito();
    }
}

function finalizarCompra() {

    if (carrito.length === 0) {

        alert("El carrito está vacío.");

        return;

    }

    alert("¡Compra realizada con éxito!");

    limpiarCarrito();

}

// INICIO


document.addEventListener('DOMContentLoaded', () => {

 cargarProductos();

cargarProductosDestacados();

cargarDetalleProducto();

cargarCarrito();

cargarCategorias();

configurarFiltro();

});