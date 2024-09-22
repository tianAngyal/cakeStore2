import store from "./store.js";
import euro from "../currencyConfig.js";
const checkOutSection = document.querySelector(".check-out");

const checkOutUI = function () {
  const mappedMarkUp = store.addedToCard.map((element) => {
    return `
            <div class="check-out_item">
            <div class="check-out_item_separator">
            <p class="name description">${element.name}</p>
                    <div class="amount-info"> 
                        <span class="amount price">${element.quantity}x</span>
                        <span class="price-per-item item-title">${
                          "@" +
                          euro(element.price + euro(element.price).s.symbol)
                        }</span>
                        <span class="price-total">${
                          euro(element.quantity * element.price) +
                          euro(element.quantity * element.price).s.symbol
                        }</span>
                    </div>
                </div>
                <button data-id="${
                  element.id
                }" class="removeItem"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="-0.5 -1 10 12"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg></button>
            </div> `;
  });

  checkOutSection.innerHTML = "";
  checkOutSection.innerHTML = `
            <h3 class="check-out_title">Your Cart (${
              store.storeQuantityTotal
            })</h3>
            ${mappedMarkUp.join(" ")}
            <div class="order-total">
            <p class="order-total_title">Order Total</p>
            <p class="order-total_amount">${
              euro(store.priceTotal) + euro(store.priceTotal).s.symbol
            }</p>
            </div>
            <div class="carbon-neutral">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><path fill="#1EA575" d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z"/><path fill="#1EA575" d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"/></svg>
            <span>This is a <b>carbon-neutral</b> delivery</span>
            </div>
            <button id="confirm" class="confirm">Confirm Delivery</button>`;
};

export default checkOutUI;
