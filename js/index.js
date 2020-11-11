document.addEventListener("DOMContentLoaded", () => cargarProductos());

function obtenerProductos() {
  const url = "../dbProd.json";

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => console.log(`Error = ${err}`));
}

/*---------------------------------------*/

async function cargarProductos() {
  const productos = await obtenerProductos();

  let html = "";
  productos.forEach((product) => {
    html += `
    <div
      class="col-span-4 md:col-span-2 xl:col-span-1 flex flex-col items-center max-w-sm"
    >
      <div class="bg-white rounded-xl mt-8 py-4 px-12 md:px-4  hover:shadow-xl w-full">
        <div>
        <img
          src="${product.image}"
          class="w-48 h-48 rounded-full object-cover object-center overflow-hidden mb-4 flex mx-auto shadow-md"
          alt=""
        />
        </div>
          <span class="font-bold text-gray-800 text-base leading-tight">${product.name}</span>
          <hr class="mt-4 mb-4">

          <div class="text-xs text-gray-600 font-light">${product.extraInfo}</div>
          <div class="text-xs text-gray-600 font-light">${product.relleno}</div>
          <div class="text-xs text-gray-600 font-light">${product.delivery}</div>

          <div class="w-full flex items-center space-x-3 justify-end">
            
            <div class="block inline-block text-lg text-red-600 font-bold">$ ${product.price}</div>

            <button class="block inline-block flex mx-auto bg-transparent rounded-full hover:text-blue-600 text-blue-300"><i class="fas fa-plus-circle text-xl"></i></button>
          </div>

          
      </div>
    </div>`;
  });

  document.querySelector("#productos").innerHTML = html;
}

function abrirCarrito() {
  const btnCarrito = document.getElementsByClassName("cart-products")[0];

  btnCarrito.classList.forEach((item) => {
    if (item === "hidden") {
      btnCarrito.classList.remove("hidden");
      btnCarrito.classList.add("block");
    } else {
      if (item === "block") {
        btnCarrito.classList.remove("block");
        btnCarrito.classList.add("hidden");
      }
    }
  });
}
