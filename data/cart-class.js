import { validDeliveryOption } from "./deliveryOptions.js";

export class Cart {
  cartItems;
  #localStorageKey;

  //name has to be constructor
  //cant use return statement

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || []

    
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCartWithoutSelection(productId, quantity) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: 1
      });
    }

    this.saveToStorage();
  }

  addToCart(productId) {
    let matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);

    const selectedQuantity = document.querySelector(`.js-quantity-selector-${productId}`);
    if (!selectedQuantity) {
      console.error(`Quantity selector for product ${productId} not found.`);
      return;
    }

    // If the item exists, update the quantity; otherwise, add a new item
    if (matchingItem) {
      matchingItem.quantity += Number(selectedQuantity.value);
    } else {
      this.cartItems.push({
        productId, 
        quantity: Number(selectedQuantity.value),
        deliveryOptionId: '1'
      });
    }

    this.saveToStorage();
  }

  removeFromCart(productId) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.productId !== productId);
    this.saveToStorage();
  }

  updateQuantity(productId, newQuantity) {
    const matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);

    if (!matchingItem) {
      console.error(`Product with ID ${productId} not found.`);
      return;
    }

    matchingItem.quantity = newQuantity;
    this.saveToStorage();
  }

  calculateCartQuantity() {
    let cartQuantity = 0;

    this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
   return cartQuantity;
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    const matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);

    if (!matchingItem) {
      console.error(`Product with ID ${productId} not found.`);
      return;
    }

    if (!validDeliveryOption(deliveryOptionId)) {
      console.error(`Invalid delivery option: ${deliveryOptionId}`);
      return;
    }

    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }
}



export let cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');


console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);