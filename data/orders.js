import {formatCurrency} from '../scripts/utils/money.js';
import {cart} from './cart-class.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {products, loadProductsFetch} from './products.js';


export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  //unshift is method for array to put elements to the beginning of an existing array
  orders.unshift(order);
  saveToOrderStorage();
}

function saveToOrderStorage() {
  localStorage.setItem('orders', JSON.stringify(orders))
}



async function renderOrderPage() {
  await loadProductsFetch(); 
  
  let ordersGrid = document.querySelector('.js-orders-grid');
  ordersGrid.innerHTML = ''; // Clear the grid before adding new orders

  orders.forEach((order) => {
    let orderDate = dayjs(order.orderTime).format('MMMM D')
    console.log(order)
    let orderHTML = `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderDate}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
        <div class="order-details-grid js-order-details-grid-${order.id}">
        </div>
      </div>
    `;
    
    ordersGrid.innerHTML += orderHTML;

    order.products.forEach((productOrdered) => {
      const { productId, quantity, estimatedDeliveryTime } = productOrdered;
      const date = dayjs(estimatedDeliveryTime).format('MMMM D');
      const matchingItem = products.find(product => product.id === productId);

      if (matchingItem) {
        const orderDetailsGrid = document.querySelector(`.js-order-details-grid-${order.id}`);
        
        let productHTML = `
          <div class="product-image-container">
            <img src="${matchingItem.image}">
          </div>
          <div class="product-details">
            <div class="product-name">${matchingItem.name}</div>
            <div class="product-delivery-date">Arriving on: ${date}</div>
            <div class="product-quantity">Quantity: ${quantity}</div>
            <button class="buy-again-button button-primary js-buy-again" data-product-id="${productId}" data-quantity="${quantity}">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>
          <div class="product-actions">
            <a href="tracking.html?orderId=${order.id}&productId=${productId}">
              <button class="track-package-button button-secondary">Track package</button>
            </a>
          </div>
        `;

        orderDetailsGrid.innerHTML += productHTML;
      }
    });
  });

  document.querySelectorAll('.js-buy-again').forEach(button => {
    button.addEventListener('click', (event) => {
      const productId = button.getAttribute('data-product-id');
      const quantity = parseInt(button.getAttribute('data-quantity'), 10);

      cart.addToCartWithoutSelection(productId, quantity);
      document.querySelector('.js-cart-quantity-2').innerHTML = cart.calculateCartQuantity() || '';

      button.innerHTML = 'Added';
      setTimeout(() => {
        button.innerHTML = `
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        `;
      }, 1000);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.js-cart-quantity-2').innerHTML = cart.calculateCartQuantity() || '';
  renderOrderPage();
});
