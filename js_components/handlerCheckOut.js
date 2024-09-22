import store from "./store.js";
import { checkOutDefaultUI } from "./checkOutDefaultUI.js";
import checkOutUI from "./checkOutUI.js";
import cardUI from "./cardUI.js";
import renderModal from "./modal.js";

const checkOutSection = document.querySelector(".check-out");

const handlerCheckOut = () => {
  return checkOutSection.addEventListener("click", (e) => {
    const confirmButton = e.target.closest("#confirm");
    const removeItem = e.target.closest(".removeItem");
    if (confirmButton) {
      renderModal();
    } else if (removeItem) {
      const indexOfItemToRemove = store.addedToCard.findIndex((element) => {
        return element.id == removeItem.getAttribute("data-id");
      });

      const searchedElement = store.addedToCard.find((element) => {
        return element.id == removeItem.getAttribute("data-id");
      });
      store.storeQuantityTotal -= searchedElement.quantityTotal;

      store.addedToCard.splice(indexOfItemToRemove, 1);

      const foundElement = store.allItems.find((element) => {
        return element == searchedElement;
      });

      foundElement.quantity = 0;
      store.priceTotal = store.priceTotal - foundElement.sum;
      foundElement.sum = 0;

      if (store.priceTotal <= 0) {
        store.quantityTotal = 0;
        checkOutDefaultUI();
      } else {
        checkOutUI();
      }
      cardUI();
    }
  });
};

export default handlerCheckOut;
