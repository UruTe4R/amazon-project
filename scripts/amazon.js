// ../ means get out of the folder and find new folder
// has to open in live server to get module to work
import {cart} from '../data/cart-class.js';
import {products, loadProducts} from '../data/products.js';
import'../data/products.js';

loadProducts(renderProductsGrid);

function renderProductsGrid() {

  updateCartQuantity();
  let productsHTML = '';
  renderAmazonHomePage(products);
  function renderAmazonHomePage(products) {
    const url = new URL(window.location.href);
    const search = url.searchParams.get('search');
  
    let filteredProducts = products;

    // If a search term exists in the URL parameters,
    // filter the products that match the search.
    if (search) {
      // Convert the search term to lowercase for case-insensitive comparison
      const searchLowered = search.toLowerCase();
    
      // Filter products by name or keywords
      filteredProducts = products.filter((product) => {
        const productLowered = product.name.toLowerCase();
        const keywordsLowered = product.keywords.map(keyword => keyword.toLowerCase());
    
        return productLowered.includes(searchLowered) ||
               keywordsLowered.includes(searchLowered);
      });
    }
    
  
    filteredProducts.forEach((product) => {


      productsHTML += `<div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>
    
        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>
    
        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>
    
        <div class="product-price">
          ${product.getPrice()}
        </div>
    
        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
    
        ${product.extraInfoHTML()}
    
        <div class="product-spacer"></div>
    
        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>
    
        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>`;
    
    });
    
    document.querySelector('.js-products-grid')
    .innerHTML = productsHTML;

    
    
  
  }
  let addedMessageTimeoutId = {};
    
    
    
  document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
      button.addEventListener('click', () => {
        
        //dataset is an object
        const {productId} = button.dataset;
        cart.addToCart(productId);
        updateCartQuantity();

        
        const addToCartMessage = document.querySelector(`.js-added-to-cart-${productId}`);
        addToCartMessage.classList.add('visible-added');
        const previousTimeoutId = addedMessageTimeoutId[productId];

        if (previousTimeoutId) {
          clearTimeout(previousTimeoutId);
          
        }
          
        const timeoutId = setTimeout(() => {
        addToCartMessage.classList.remove('visible-added');
        }, 2000);
        
        addedMessageTimeoutId[productId] = timeoutId; 
        
      
      });

    });
    
}




function updateCartQuantity() {
    const cartQuantity = cart.calculateCartQuantity();
        document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;
  } 


  document.querySelector('.js-search-button')
  .addEventListener('click', () => {
    const search = document.querySelector('.js-search-bar').value;
    window.location.href = `index.html?search=${search.toLowerCase()}`;
  });
