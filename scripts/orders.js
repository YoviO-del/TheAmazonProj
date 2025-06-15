import {orders} from './data/orders.js';
import { products, getProduct } from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import {formatCurrency} from './utils/money.js';
import {totalCents} from './checkout/paymentSummary.js';
import {addToCart} from './data/cart.js';
let totalHTML = '';

   
orders.forEach((order) => {
  let ordersHeaderHtml = '';
    const orderDate = dayjs(order.orderTime);
    const dateStringOrder = orderDate.format('MMMM DD');
    let productHTML = '';

    ordersHeaderHtml += 
    `
    <div class="order-container">

          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dateStringOrder}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(totalCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          `;


          order.products.forEach((product) => {
    

            const deliveryOptionId = product.deliveryOptionId
            const deliveryOption = getDeliveryOption(deliveryOptionId);
      
            
            
      
            const deliveryDate = orderDate.add( deliveryOption.deliveryDays,'days');
            const dateStringDelivery = deliveryDate.format('MMMM DD');
            productHTML +=
            `
            <div class="order-details-grid">
                  <div class="product-image-container">
                    <img src="${product.image}">
                  </div>
      
                  <div class="product-details">
                    <div class="product-name">
                      ${product.name}
                    </div>
                    <div class="product-delivery-date">
                      Arriving on: ${dateStringDelivery}
                    </div>
                    <div class="product-quantity">
                      Quantity: ${product.quantity}
                    </div>
                    <button class="buy-again-button js-buy-again-button button-primary"
                    data-product-id="${product.id}>
                      <img class="buy-again-icon" src="images/icons/buy-again.png">
                      <span class="buy-again-message">Buy it again</span>
                    </button>
                  </div>
      
                  <div class="product-actions">
                    <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
                      <button class="track-package-button button-secondary">
                        Track package
                      </button>
                    </a>
                  </div>
          `;
            
          });

     totalHTML += ordersHeaderHtml + productHTML + `</div>`;
});


document.querySelector('.js-orders-grid').innerHTML = totalHTML;

document.querySelectorAll('.js-buy-again-button').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.data.product.id;
    addToCart(productId);
  });
});