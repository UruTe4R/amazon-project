import { validDeliveryOption } from "./deliveryOptions.js";


export let cart;

export function calculateCartQuantity() {
  let cartQuantity = 0;

      cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
   return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId){
      matchingItem = cartItem;
    }
    
  });  
  matchingItem.quantity = newQuantity;
  
  saveToStorage();
}

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || []
}


function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  const selectedQuantity = document.querySelector(`.js-quantity-selector-${productId}`);

//objuct is truthy value
  if (matchingItem) {
    matchingItem.quantity += Number(selectedQuantity.value);
  } else {
    cart.push({productId, 
               quantity: Number(selectedQuantity.value),
               deliveryOptionId: '1'
  });
  }
  saveToStorage();
}

export function removeFromCart(productId) {

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      cart.push(cartItem);
    }
  });


  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });
  if(!matchingItem){
    return;
  }
  if (!validDeliveryOption(deliveryOptionId)) {
    return;
  }

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}

export async function loadCartFetch() {
  const response = await fetch('https://supersimplebackend.dev/cart');
  const text = await response.text();
  console.log(text);
} 