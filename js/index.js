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
      class="col-span-4 md:col-span-2 lg:col-span-1 xl:col-span-1 flex flex-col items-center max-w-sm"
    >
      <div class="bg-white rounded-md mt-8 py-4 px-4 hover:shadow-xl w-full">
        <img
          src="${product.image}"
          class="w-64 rounded-md object-center mb-4 flex mx-auto"
          alt=""
        />
          <span class="font-bold text-gray-800 text-base leading-tight">${product.name}</span>
          <hr class="mt-4">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-600 font-light">${product.extraInfo}</div>
            <div class="text-2xl text-red-600 font-bold mb-2">$ ${product.price}</div>
          </div>
          <button class="p-4 flex mx-auto font-semibold bg-blue-400 rounded-3xl text-white">Agregar al carrito</button>
      </div>
    </div>`;
  });

  document.querySelector("#productos").innerHTML = html;
}
