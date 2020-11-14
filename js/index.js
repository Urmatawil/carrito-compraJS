document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
  agreProdCarrito();
});

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
      <div class="bg-white rounded-xl mt-8 py-4 px-8 sm:px-20 md:px-10  hover:shadow-xl w-full">
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

            <button id="btnCart" class="block inline-block flex mx-auto bg-transparent rounded-full hover:text-green-700 text-green-500"><i class="fas fa-plus-circle text-xl" onclick="addCart(${product.id})"></i></button>
          </div>

          
      </div>
    </div>`;
  });

  document.querySelector("#productos").innerHTML = html;
}

/*------ Menu -------------*/

const boton = document.querySelector("#boton");
const menu = document.querySelector("#menu");
const btnCart = document.querySelector("#btnCart");

boton.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

/*-------- LocalStorage----------*/

const CART = "ProdID";
function addCart(idProd) {
  let arrProdID = [];

  let localStorageItems = localStorage.getItem(CART);

  if (!localStorageItems) {
    arrProdID.push(idProd);
    localStorage.setItem(CART, arrProdID);
  } else {
    let ProdSt = localStorage.getItem(CART);
    ProdSt.length > 0 ? (ProdSt += `,${idProd}`) : (ProdSt = ProdSt);
    localStorage.setItem(CART, ProdSt);
  }
  agreProdCarrito();
}
/*-------------------------------*/

async function agreProdCarrito() {
  const products = await obtenerProductos();

  /*---convertimos el LS en un array--*/
  const itemsLS = localStorage.getItem(CART);

  if (itemsLS) {
    const splitItems = itemsLS.split(",");
    //eliminamos los duplicados
    const productsAddCart = Array.from(new Set(splitItems));

    let html = "";
    productsAddCart.forEach((id) => {
      products.forEach((prod) => {
        if (id == prod.id) {
          let cantidad = contadorID(id, splitItems);
          html += `
      <div class="Cart-prod p-1 ml-1 flex ">
        <img class="h-10 w-10 rounded-full w-1/4 mt-6 mr-2" src="${prod.image}">
        <div>
        <div class="flex inline-flex space-x-2">
        <span class="text-xs">${prod.name}</span>
        <button class="text-sm hover:text-red-700 text-red-500"><i class="fas fa-times-circle"></i></button>
        </div>
        <p class="text-xs text-red-500">Total: ${prod.price * cantidad}</p>
        <div class="flex inline-flex space-x-2">
        <p class="text-xs">Cantidad: ${cantidad}</p>
        <button class="text-sm hover:text-red-700 text-red-500"><i class="fas fa-minus-circle"></i></button>
        <button class="text-sm hover:text-green-700 text-green-500" onclick="btnMas(${
          prod.id
        })"><i class="fas fa-plus-circle"></i></button>
        </div>
        <hr>
        </div>
      </div>
      `;
        }
      });
    });

    const menu = (document.querySelector("#menu").innerHTML = html);
  }
}

const contadorID = (valor, arrID) => {
  let contador = "";
  arrID.forEach((id) => {
    if (valor == id) {
      contador++;
    }
  });
  return contador;
};

const btnMas = () => console.log("Mas");

const btnMenos = () => console.log("Menos");
