function cargarProductos() {
    const productList = document.querySelector('.api');

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
                    <button onclick="addToCart(${product.id})">Agregar al carrito</button>
                `;

                productList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
            productList.innerHTML = '<p>Hubo un error al cargar los productos.</p>';
        });
}

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
            lista.innerHTML = '<p>Hubo un error al cargar los productos destacados.</p>';
        });
}

function addToCart(idProducto) {
    console.log('Producto agregado al carrito:', idProducto);
}

document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    cargarProductosDestacados();
});