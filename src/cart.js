let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y,0);
}

calculation();

let generateCartItems = () => {
    if (basket.length !==0){
        return (shoppingCart.innerHTML = basket.map((x) => {
            let {id, item} = x;
            let search = shopItems.find((y) => y.id === id) || [];
            let {img, name, price} = search;
            return `
            <div class="cart-item">
                <img class="img-fluid w-100" src=${img} alt="" />
                <div class="cart-details">
                    <div class="title-price">
                        <h4 class="text-uppercase">${name}</h4>
                        <h4>Individual Price - € <span class="fw-bolder">${price}</span></h4>
                        <img onclick="removeItem(${id})" class="icon-x" src="img/x.svg" />
                    </div>
                    <div class="cart-buttons">
                        <div class="btn-quantity">
                            <img onclick="decrement(${id})" class="icon-quantity" src="img/minus.svg" alt="">
                            <div id="${id}" class="quantity m-2">${item}</div>
                            <img onclick="increment(${id})" class="icon-quantity" src="img/plus.svg" alt="">
                        </div>
                    </div>
                    <h3 class="total-price">Total Price - € ${item * price}</h3>
                    <button class="extras m-1 text-uppercase fw-bolder">Extras</button>
                </div>
            </div>
            `;
        }).join(""));
    }else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is empty</h2>
        <a class="btn-back" href="index.html">Back to Shop</a>
        `;
    }
};

generateCartItems();

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
    update(id);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
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
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id)
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
};

let removeItem = (id) => {
    basket = basket.filter((x) => x.id !== id);
    generateCartItems();
    totalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}

let clearCart = () => {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}

let totalAmount = () => {
    if (basket.length !== 0){
        let amount = basket.map((x) => {
            let {id, item} = x;
            let search = shopItems.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x, y) => x + y, 0);
        let plus = amount / 2;
        let totalPlus = plus + amount;
        label.innerHTML = `
        <h2>Bill: € ${amount}</h2>
        <h2>Plus 50% preparation: € ${plus}</h2>
        <h2>Total bill: € ${totalPlus}</h2>
        <div class="cart-buttons">
            <button class="checkout">Checkout</button>
            <button onclick="clearCart()" class="removeAll">Remove All</button>
        </div>
        `
    }else return;
};

totalAmount();