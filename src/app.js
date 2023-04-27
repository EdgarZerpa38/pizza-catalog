let shop = document.getElementById("shop");
let ingredients = document.getElementById("ingredients");
let botonAbrirDetalles = document.querySelectorAll(".btn-detalle");
let botonCerrarDetalles = document.querySelector(".cerrar-detalle");
let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateItems = () => {
  return (shop.innerHTML = shopItems.map((x) => {
    let {id, name, price, img, des} = x;
    let search = basket.find((x) => x.id === id) || [];
    return `
    <div id="item" class="col-4 m-2 border-5 box-pizza shadow">
      <div class="p-2">
        <h3 class="text-uppercase">${name}</h3>
        <img class="img-fluid w-100 object-fit-cover" src=${img} alt="${name}">
        <h4 class="mx-1">Price: <span class="fw-bolder">€ ${price}</span></h4>
        <div class="buttons">
          <div class="btn-quantity">
            <img onclick="decrement(${id})" class="icon-quantity" src="img/minus.svg" alt="">
            <div id="${id}" class="quantity m-2">${search.item === undefined ? 0 : search.item}</div>
            <img onclick="increment(${id})" class="icon-quantity" src="img/plus.svg" alt="">
          </div>
        </div>
        <div id="pizza-details-${id}" class="pizza-details d-none">
          <p class="mx-1">${des}</p>
          <ul id="ingredients" class="ingredients-pizza"></ul>
          <button class="cerrar-detalle">Cerrar</button>
        </div>
      </div>
    </div>
    `
  }).join(""));
};

generateItems();

let increment = (id) => {
  let search = basket.find((x) => x.id === id);
  
  if(search === undefined) {
    basket.push({
      id: id,
      item: 1
    });
  }else {
    search.item += 1;
  }
  localStorage.setItem("data", JSON.stringify(basket));
  update(id);
};

let decrement = (id) => {
  let search = basket.find((x) => x.id === id);

  if(search === undefined) return
  else if(search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(id);
  basket = basket.filter((x) => x.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id)
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y,0);
}

calculation();