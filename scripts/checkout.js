import {renderOrderSummary} from './checkout/orderSummary.js'
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import {renderCheckoutHeader} from './checkout/checkoutHeader.js'
import '../data/car.js';
import {loadProducts, loadProductsFetch} from '../data/products.js';
import {loadCart, loadCartFetch} from '../data/cart.js'
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

async function loadPage() {
  try {
    await Promise.all([
      loadProductsFetch(),
      loadCartFetch()
    ])
   
     } catch (error) {
    console.log('Unexpected error. Please try again later.');
  }
  

  renderCheckoutHeader();
  renderPaymentSummary();
  //MVC = Model Views Controller
  renderOrderSummary();
}

loadPage();


/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then((values) => {
  console.log(values);
  renderCheckoutHeader();
  renderPaymentSummary();
  //MVC = Model Views Controller
  renderOrderSummary();
});

*/

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });

}).then((value) => {
  console.log(value);
  return new Promise((resolve) => {
    loadCart(() => {
      resolve()
    });
  });

}).then(() => {
  renderCheckoutHeader();
  renderPaymentSummary();
  //MVC = Model Views Controller
  renderOrderSummary();
});
*/

/*// callback

loadProducts(() => {
  loadCart(() => {
    renderCheckoutHeader();
    renderPaymentSummary();
    //MVC = Model Views Controller
    renderOrderSummary();
  })

});
*/