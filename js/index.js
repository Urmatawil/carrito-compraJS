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

            <button id="btnCart" class="block inline-block flex mx-auto bg-transparent rounded-full hover:text-blue-600 text-blue-300"><i class="fas fa-plus-circle text-xl" onclick="addCart(${product.id})"></i></button>
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
    ProdSt.length > 0
      ? ((ProdSt += `,${idProd}`), console.log(ProdSt))
      : (ProdSt = ProdSt);
    localStorage.setItem(CART, ProdSt);
  }
  agreProdCarrito();
}
/*-------------------------------*/

async function agreProdCarrito() {
  const products = await obtenerProductos();

  /*---convertimos el LS en un array--*/
  const itemsLS = localStorage.getItem(CART);

  const splitItems = itemsLS.split(",");
  const productsAddCart = Array.from(new Set(splitItems));
  console.log(productsAddCart);

  let html = "";
  productsAddCart.forEach((id) => {
    products.forEach((prod) => {
      id == prod.id
        ? (html += `
      <div class="Cart-prod p-4">
        <img class="h-10 w-10 rounded-full p-1" src="${prod.image}">
        <span class="text-xs">${prod.name}</span>
        <p class="text-xs">${prod.price}</p>
        <hr>
      </div>
      `)
        : null;
    });
  });

  const menu = (document.querySelector("#menu").innerHTML = html);
  console.log(menu);
}
