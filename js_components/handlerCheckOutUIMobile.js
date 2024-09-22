import { iconCart, iconClosed, totalProducts } from "./checkOutDefaultUI.js";
import store from "./store.js";
import euro from "../currencyConfig.js";
const checkOutContainer = document.querySelector(".check-out");
const modalMobile = document.querySelector(".modal_mobile");

const handlerCheckOutMobile = () => {
  checkOutContainer.addEventListener("click", (e) => {
    if (iconCart && iconClosed) {
      if (store.addedToCard.length == 0) {
        const cartEmpty = `<span class="alertMessage">Košik je prázdny</span>`;
        checkOutContainer.insertAdjacentHTML("afterbegin", cartEmpty);

        const alertMessage = document.querySelector(".alertMessage");
        setTimeout(() => {
          alertMessage.remove();
        }, 2100);
      } else if (store.addedToCard.length != 0) {
        if (modalMobile.classList.contains("modal_mobile_hidden")) {
          modalMobile.classList.remove("modal_mobile_hidden");
          iconClosed.classList.remove("icon_hidden");
          iconCart.classList.add("icon_hidden");
          totalProducts.classList.remove("total-products");
          totalProducts.classList.remove("tpanimation");
          totalProducts.style.display = "none";
          document.body.style.overflow = "hidden";
          const mappedElement = store.addedToCard
            .map((element) => {
              return `<div class="item">
                        <span class="item-style">${element.name}</span>
                        <div class="item-parameters">
                          <span class="item-style">${element.quantity}x</span>
                          <span class="item-style">${
                            "@" + euro(element.price)
                          }</span>
                          <span class="item-style">${
                            euro(element.sum) + euro(element.sum).s.symbol
                          }</span>
                        </div>
                      </div>
                      `;
            })
            .join("");
          const modalMobileMarkup = `
            <div class="content_mobile">
            <h3 class="check-out_title mobile">Your Cart</h3>
            <div class="container-items">
            ${mappedElement}
            </div>
            <div class="order-total_mobile">
            <p class="order-total_title">Order Total</p>
            <p class="order-total_amount">${
              euro(store.priceTotal) + euro(store.priceTotal).s.symbol
            }</p>
            </div>
            <button id="confirm" class="confirm confirm_mobile">Confirm Delivery</button>
            </div>`;
          modalMobile.innerHTML = modalMobileMarkup;
          const containerItems = document.querySelector(".container-items");
          containerItems.scrollTop = containerItems.scrollHeight;
        } else {
          modalMobile.classList.add("modal_mobile_hidden");
          iconClosed.classList.add("icon_hidden");
          iconCart.classList.remove("icon_hidden");
          totalProducts.classList.add("total-products");
          totalProducts.classList.add("tpanimation");
          totalProducts.style.display = "flex";
          document.body.style.overflow = "scroll";
        }
      }
    }
  });
};

export { modalMobile, handlerCheckOutMobile };
