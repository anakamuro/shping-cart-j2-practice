const productsListEl = document.querySelector('.product-list');
const seeMoreBtn = document.querySelector(".see-more-btn");

seeMoreBtn.addEventListener('click', () => {
    productsListEl.scrollIntoView({behavior: "smooth"})
})

const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");
function renderProducts(){
    products.forEach((product) => {
    productsEl.innerHTML += `
            <div class="item">
                        <div class="item-container">
                            <div class="item-img">
                                <img src="${product.imgSrc}" alt="{product.name}">
                            </div>
                            <div class="desc">
                                <h2>${product.name}</h2>
                                <h2><small>$</small>${product.price}</h2>
                                <p>
                                   ${product.description}
                                </p>
                            </div>
                            <div class="add-to-wishlist">
                                <img src="https://purepng.com/public/uploads/large/heart-icon-y1k.png" alt="add to wish list">
                            </div>
                            <div class="add-to-cart" onclick="addToCart(${product.id})">
                                <img src="https://th.bing.com/th/id/OIP.9EnlsurtnPQ8dpe863Z0uAHaHa?w=211&h=211&c=7&r=0&o=5&pid=1.7" alt="add to cart">
                            </div>
                        </div>
                    </div>
    
    `
    })
}
renderProducts()
// let cart = []
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart()

//ADD To CART
function addToCart(id){
    //check if product already exists in cart
    if (cart.some((item) => item.id === id)){
  changeNumberOfUnits("plus", id)
    } else {
        const item = products.find((product) => product.id === id)
        cart.push({
          ...item, 
          numberOfUnits: 1
        })
    }
  updateCart();
}

function updateCart(){
    renderCartItems();
    renderSubtotal();
    // save cart to localStorage
    localStorage.setItem("CART", JSON.stringify(cart))
}

//calculate and render subtotal 
function renderSubtotal(){
    let totalPrice = 0, 
    totalItems = 0;
    cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    });
    subtotalEl.innerHTML = `Subtotal (${totalItems} items): $${totalPrice.toFixed(2)}`
    totalItemsInCartEl.innerHTML = totalItems;
}

function renderCartItems(){
    cartItemsEl.innerHTML = '';
    cart.forEach((item) => {
        cartItemsEl.innerHTML += `
            <div class="cart-item">
            <div class="item-info" onclick="removeItemFromCart(${item.id})">
                <img src="${item.imgSrc}" alt="${item.name}">
                <h4>${item.name}</h4>
            </div>
            <div class="unit-price">
                <small>$</small>${item.price}
            </div>
            <div class="units">
                <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                <div class="number">${item.numberOfUnits}</div>
                <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>
             </div>
        </div>
    `
    })
}

//remove item from cart

function removeItemFromCart(id){
    cart = cart.filter((item) => item.id !== id)
   updateCart();
}

function changeNumberOfUnits(action, id){
    cart = cart.map((item) => {
 
     let numberOfUnits = item.numberOfUnits;
     console.log(numberOfUnits)
     if(item.id === id){
         if(action === "minus" && numberOfUnits > 1 ){
             numberOfUnits--;
         } else if (action ==="plus" && numberOfUnits < item.instock){
             numberOfUnits++;
         }
     }
     return {
         ...item,
         numberOfUnits
     }
    })
    updateCart();
 }