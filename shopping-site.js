const products = [
    { id: 1, image: '1.png', name: 'product1', price: 100 },
    { id: 2, image: '2.png', name: 'product2', price: 110 },
    { id: 3, image: '3.png', name: 'product3', price: 190 },
    { id: 4, image: '4.png', name: 'product4', price: 150 },
    { id: 5, image: '5.png', name: 'product5', price: 180 },
    { id: 6, image: '6.png', name: 'product6', price: 170 },
    { id: 7, image: '2.png', name: 'product7', price: 180 },
    { id: 8, image: '1.png', name: 'product8', price: 154 }
];

let cartList = [];
let cartCount=0;

function generateProductsHtml() {
    let productsHtml = '';
    products.forEach((product, index) => {
        productsHtml += `
           <div class="div1">
            <img src="images/${product.image}" alt="${product.name}">
            <h3 style="margin-top:0px;font-size:20px;">${product.name}</h3>
            <div class="flex2">
                <h4 style="margin-top:-15px; font-size:17px; ">Price: ${product.price}</h4>
                <button style="width:100px; height:30px; margin-left:10px; margin-top:-40px" onclick="addToCart(${index})"  class="success">Add</button>
            </div>
            </div>`;
    });
    document.querySelector('#items').innerHTML = productsHtml;
}

function cartTransition() {
    document.querySelector('#move').classList.add('after');
    document.querySelector('.bigbox').classList.add('js-bigbox');
    document.querySelector('#hidden').classList.add('hidden');
}
     
function addToCart(key) {
    // console.log(key)
    if (!cartList[key]) {
        cartList[key] = { ...products[key], quantity: 1 };
        cartCount++;
        document.querySelector('.cartQ').innerHTML=cartCount;
    } else {
          cartList[key].quantity++;
    }
     reloadCart();
}

function reloadCart() {
    let cartListHtml = '';
    // console.log(cartList)
     let total=0;
    cartList.forEach((product, index) => {
        if (product) {
            cartListHtml += `
             <div class="cart-flex">
                <div class="cart-flex1">
                    <img src="images/${product.image}" style="width:70px;height:70px;">
                    <p style="font-size:20px;">${product.name}</p>
                </div>
                <span style="font-size:20px;margin-left:-330px;margin-right:50px">${product.price * product.quantity}</span>
                <div class="cart-flex1">
                    <button style="height: 15px;margin-top:22px;padding-left:3px;padding-right:3px;padding-bottom:15px; " onclick="changeQuantity(${index}, ${product.quantity - 1})">-</button>
                    <p style=" font-size:20px;">${product.quantity}</p>
                    <button style="height: 15px; padding-bottom:15px; padding:0px; ;padding-left:2px;padding-right:2px; padding-bottom:15px;margin-top:22px" onclick="changeQuantity(${index}, ${product.quantity + 1})">+</button>  
                </div>
            </div>
            `;
            total+=product.price * product.quantity;
        }
    });  
    document.querySelector('#cartList').innerHTML = cartListHtml;
    document.querySelector('#total').innerHTML =`${total}`
}

function changeQuantity(key, quantity) {
    if (quantity <= 0) {
        delete cartList[key];
        cartCount--;
     } 
    else {
        cartList[key].quantity = quantity;
    }
    document.querySelector('.cartQ').innerHTML = cartCount;
         reloadCart();
}

function removeTransition() {
    document.querySelector('#move').classList.remove('after');
    document.querySelector('.bigbox').classList.remove('js-bigbox');
    document.querySelector('#hidden').classList.remove('hidden');
}


generateProductsHtml();