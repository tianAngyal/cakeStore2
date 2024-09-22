import store from "./store.js";
import euro from "../currencyConfig.js";

const desertsContainer = document.querySelector(".deserts");

const cardUI = function () {
  desertsContainer.innerHTML = "";
  desertsContainer.innerHTML = '<h1 class="title">Desserts</h1>';
  store.allItems.forEach((item) => {
    const markUp = `
                          
                          <div class="desert-card" id="${item.id}">
                              <img src="${
                                item.images.desktop
                              }" class="desert-card_image ${
      item.quantity ? "border" : ""
    }" />
                              <div class="desert-card_add-to-image ${
                                item.quantity ? "hidden" : ""
                              }">
                                  <svg xmlns="http:www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20">
                                      <g fill="#C73B0F" clip-path="url(#a)">
                                          <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/>
                                          <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/>
                                      </g>
                                  </svg><span>Add to Cart</span>
                              </div>
                              <div class="desert-card_counter-container ${
                                item.quantity ? "" : "hidden"
                              }">
                              <svg class="decrease" xmlns="http://www.w3.org/2000/svg" viewBox="-7 -10 26 22">
                                  <circle cx="5" cy="1" r="8"></circle>
                                  <path d="M0 .375h10v1.25H0V.375Z"/></svg>
                              <span class="counter">${item.quantity}</span>
                              <svg xmlns="http://www.w3.org/2000/svg" class="increase" viewBox="-7 -7 25 25">
                                  <circle cx="5" cy="5" r="8"></circle>
                                  <path d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/>
                              </svg>
                              </div>
                              <div class="desert-card_description">
                                  <ul class="desert-card_description_list">
                                      <li class="desert-card_description_list_item">
                                          <p class="item-title">${
                                            item.category
                                          }</p>
                                      </li>
                                      <li class="desert-card_description_list_item">
                                          <h4 class="description">${
                                            item.name
                                          }</h4>
                                      </li>
                                      <li class="desert-card_description_list_item">
                                          <p class="price">${
                                            euro(item.price) +
                                            euro(item.price).s.symbol
                                          }</p>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                          `;
    return desertsContainer.insertAdjacentHTML("beforeend", markUp);
  });
};

export default cardUI;
