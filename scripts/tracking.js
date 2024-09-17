import {orders} from '../data/orders.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {getProduct, loadProductsFetch} from '../data/products.js';
import {cart} from '../data/cart-class.js';

async function renderTrackingPage() {
  await loadProductsFetch();
  const url = new URL(window.location.href);
  orders.forEach((order) => {
    console.log(order)
    if(order.id === url.searchParams.get('orderId')) {
      order.products.forEach((product) => {
        if(product.productId === url.searchParams.get('productId')) {

          const matchingProduct = getProduct(product.productId);

       console.log(matchingProduct)
       const { estimatedDeliveryTime } = product;
       const date = dayjs(estimatedDeliveryTime).format('MMMM D');
       //calculate the progress % of delivery
       
       let currentTime = dayjs();
       const above = (currentTime.$D - Number(dayjs(order.orderTime).format('D')))
       if (above < 0) {
        above += currentTime.$D
       }
       const below = Number(dayjs(estimatedDeliveryTime).format('D')) - Number(dayjs(order.orderTime).format('D'));
       if (below < 0 ) {
        below += Number(dayjs(estimatedDeliveryTime).format('D'))
       }
        let progressPercent = ( above / below ) * 100;
        
     
     document.querySelector('.js-order-tracking').innerHTML +=
     `
         <div class="delivery-date">
           Arriving on ${date}
         </div>
 
         <div class="product-info">
           ${matchingProduct.name}
         </div>
 
         <div class="product-info">
           Quantity: ${product.quantity}
         </div>
 
         <img class="product-image" src="${matchingProduct.image}">
 
         <div class="progress-labels-container">
           <div class="progress-label js-progress-label-1">
             Preparing
           </div>
           <div class="progress-label js-progress-label-2">
             Shipped
           </div>
           <div class="progress-label js-progress-label-3">
             Delivered
           </div>
         </div>
 
         <div class="progress-bar-container">
           <div class="progress-bar" style="
           width: ${progressPercent}%
           "></div>
         </div>
     `
       
     if (progressPercent >= 0 && progressPercent < 50) {
      document.querySelector('.js-progress-label-1').classList.add('current-status');
      document.querySelector('.js-progress-label-2').classList.remove('current-status');
      document.querySelector('.js-progress-label-3').classList.remove('current-status');

     } else if (progressPercent >= 50 && progressPercent <100) {
      document.querySelector('.js-progress-label-2').classList.add('current-status');
      document.querySelector('.js-progress-label-1').classList.remove('current-status');
      document.querySelector('.js-progress-label-3').classList.remove('current-status');
     } else if (progressPercent >= 100) {
      document.querySelector('.js-progress-label-3').classList.add('current-status');
      document.querySelector('.js-progress-label-2').classList.remove('current-status');
      document.querySelector('.js-progress-label-1').classList.remove('current-status');
     }

     
        }
       


      })
    }
  })

}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.js-cart-quantity-3').innerHTML = cart.calculateCartQuantity() || '';
  renderTrackingPage();
})
