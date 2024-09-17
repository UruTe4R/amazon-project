import { validDeliveryOption } from "./deliveryOptions.js";


// Object-oriented programming naming convention is PascalCase
function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,
  
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
  
      // Default items if the cart is empty
      if (this.cartItems.length === 0) {
        this.cartItems = [{
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: '1'
        }, {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2'
        }];
      }
    },
  
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
  
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
    },
    
    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter(cartItem => cartItem.productId !== productId);
      this.saveToStorage();
    },
  
    updateQuantity(productId, newQuantity) {
      const matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);
  
      if (!matchingItem) {
        console.error(`Product with ID ${productId} not found.`);
        return;
      }
  
      matchingItem.quantity = newQuantity;
      this.saveToStorage();
    },
    
    calculateCartQuantity() {
      return this.cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    },
  
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
  };
  
  return cart;
}

// Creating multiple cart instances
const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

// Loading carts from storage
cart.loadFromStorage();
businessCart.loadFromStorage();

// Adding an item to the main cart
cart.addToCart('54e0eccd-8f36-462b-b68a-8182611d9add');

// Logging cart contents
console.log(cart);
console.log(businessCart);
