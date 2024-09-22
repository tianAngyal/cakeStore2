import store from "./store.js";
import {
  addTotalPrice,
  sumPrice,
  deductPrice,
  reduceTotalPrice,
} from "./helperFunctions.js";
import cardUI from "./cardUI.js";
import { checkOutDefaultUI } from "./checkOutDefaultUI.js";

const checkOutSection = document.querySelector(".check-out");
const desertsContainer = document.querySelector(".deserts");

let indexOfSearchedElement;
let searchedElement;

const desertCards = () => {
  desertsContainer.addEventListener("click", (e) => {
    const targetElement = e.target.closest(".desert-card");
    const addToCardButton = e.target.closest(".desert-card_add-to-image");
    const counterContainerButton = e.target.closest(
      ".desert-card_counter-container"
    );
    const increase = e.target.closest(".increase");
    const decrease = e.target.closest(".decrease");

    if (addToCardButton) {
      if (store.priceTotal <= 0) {
        store.priceTotal = 0;
      }

      searchedElement = store.allItems.find((element) => {
        return element.id == targetElement.id;
      });

      targetElement.children[2].classList.remove("hidden");
      targetElement.children[1].classList.add("hidden");

      searchedElement.quantity = 1;
      searchedElement.quantityTotal = searchedElement.quantity;
      searchedElement.sum = sumPrice(searchedElement);
      store.storeQuantityTotal += searchedElement.quantityTotal;
      addTotalPrice(searchedElement);
      store.addedToCard.push(searchedElement);

      indexOfSearchedElement = store.addedToCard.findIndex((element) => {
        return Number(targetElement.id) === element.id;
      });

      checkOutDefaultUI();
      //AKTUALIZACIA MNOZSTVA IKONY KOSIK
      const totalProducts = document.querySelector("#total-products");
      totalProducts.classList.add("total-products");
      totalProducts.textContent = `${store.storeQuantityTotal}`;

      cardUI();
    }
    if (counterContainerButton) {
      indexOfSearchedElement = store.addedToCard.findIndex((element) => {
        return Number(targetElement.id) === element.id;
      });
      if (increase) {
        const previousQuantity =
          store.addedToCard[indexOfSearchedElement].quantity;

        store.addedToCard[indexOfSearchedElement].quantity += 1;
        store.addedToCard[indexOfSearchedElement].quantityTotal =
          store.addedToCard[indexOfSearchedElement].quantity;

        store.addedToCard[indexOfSearchedElement].sum = sumPrice(
          store.addedToCard[indexOfSearchedElement]
        );
        store.storeQuantityTotal +=
          store.addedToCard[indexOfSearchedElement].quantity - previousQuantity;
        addTotalPrice(store.addedToCard[indexOfSearchedElement]);

        //AKTUALIZACIA MNOZSTVA IKONY KOSIK
        document.querySelector(
          "#total-products"
        ).textContent = `${store.storeQuantityTotal}`;

        cardUI();
      } else if (decrease) {
        const previousQuantity =
          store.addedToCard[indexOfSearchedElement].quantity;

        store.addedToCard[indexOfSearchedElement].quantity -= 1;

        store.addedToCard[indexOfSearchedElement].quantityTotal =
          store.addedToCard[indexOfSearchedElement].quantity;

        store.addedToCard[indexOfSearchedElement].sum = deductPrice(
          store.addedToCard[indexOfSearchedElement]
        );

        store.storeQuantityTotal -=
          previousQuantity - store.addedToCard[indexOfSearchedElement].quantity;

        reduceTotalPrice(store.addedToCard[indexOfSearchedElement]);

        //AKTUALIZACIA MNOZSTVA IKONY KOSIK
        document.querySelector(
          "#total-products"
        ).textContent = `${store.storeQuantityTotal}`;
        cardUI();

        //Ak hľadaný prvok ma množstvo 0
        if (store.addedToCard[indexOfSearchedElement].quantity == 0) {
          store.addedToCard.splice(indexOfSearchedElement, 1);

          //Ak všetky prvky v poli maju množstvo 0
          if (store.addedToCard.length == 0) {
            checkOutSection.innerHTML = "";
            checkOutDefaultUI();
          } else {
            cardUI();
          }
        }
      }
    }
  });
};

export default desertCards;
