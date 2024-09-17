import {addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption} from '../../data/cart.js';
import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';
import {validDeliveryOption} from '../../data/deliveryOptions.js'

describe('test suite: addToCart', () => {

  let productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  let selectedQuantity;

  // Runs before each test
  beforeEach(() => {
    // Mock the selected quantity DOM element
    selectedQuantity = document.createElement('input');
    selectedQuantity.classList.add(`js-quantity-selector-${productId}`);
    selectedQuantity.value = 2; // Simulate the user selecting a quantity of 2
    document.body.appendChild(selectedQuantity);

    // Mock localStorage getItem and setItem methods
    spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([])); // Empty cart initially
    spyOn(localStorage, 'setItem');  // Spy on setItem to ensure it is called

    // Load from storage (which is mocked)
    loadFromStorage();
  });

  // Clean up after each test
  afterEach(() => {
    // Remove the mocked DOM element after each test
    document.body.removeChild(selectedQuantity);

    // Reset the cart array
    cart.length = 0;  // Assuming `cart` is a global array defined elsewhere
  });

  it('adds a new product to the cart', () => {
    // Call the function under test
    addToCart(productId);

    // Check that the product is added to the cart
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId);
    expect(cart[0].quantity).toEqual(2);  // The quantity selected in the input field

    // Verify that localStorage.setItem was called
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
  });

  it('adds an existing product to the cart', () => {
    // First, manually push the product to the cart to simulate an existing product
    cart.push({ productId, quantity: 1, deliveryOptionId: '1' });

    // Call the function to add the product again
    addToCart(productId);

    // The product's quantity should increase, not add a new product
    expect(cart.length).toEqual(1);  // The cart should still have only one item
    expect(cart[0].quantity).toEqual(3);  // The original quantity of 1 + 2 more from the input

    // Verify that localStorage.setItem was called with the updated cart
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
  });

});

describe('test suite:removeFromCart', () => {
  let productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
  let productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'
  const productId3 = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e'
  
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
      {
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }])
    })
    loadFromStorage();
  })

  //before each end
 
    it('remove a productid that is in the cart', () => {
      removeFromCart(productId1)
      expect(cart.length).toEqual(1);
      expect(cart).toEqual([{
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }])
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]));
    })

  })

  describe('test suite: updateDeliveryOption', ()=> {
    let productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
    let productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'
    beforeEach(()=> {
      spyOn(localStorage, 'setItem');
      spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify([
          {
            productId: productId1,
            quantity: 2,
            deliveryOptionId: '1'
          }, {
            productId: productId2,
            quantity: 1,
            deliveryOptionId: '2'
          }])

      })
    })

    it('updates delivery option', () => {
      loadFromStorage();
      updateDeliveryOption(productId1, '3');
      expect(cart.length).toEqual(2);
      expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart[0].quantity).toEqual(2);
      expect(cart[0].deliveryOptionId).toEqual('3');

      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: '3'
        }, {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: '2'
        }]))
      
    })
    it('does not update delivery option', () => {
      loadFromStorage();
      updateDeliveryOption('h83d4ca15-0f35-48f5-b7a3-1ea210004f2e', '3');
      expect(cart.length).toEqual(2);
      expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart[0].quantity).toEqual(2);
      expect(cart[0].deliveryOptionId).toEqual('1');

      expect(localStorage.setItem).toHaveBeenCalledTimes(0);
      
    })
      
    it('does nothing if the delivery option does not exist', () => {
      loadFromStorage();
      updateDeliveryOption(productId1, 'does-not-exist');
      expect(cart.length).toEqual(2);
      expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart[0].quantity).toEqual(2);
      expect(cart[0].deliveryOptionId).toEqual('1');

      expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    })
  })


