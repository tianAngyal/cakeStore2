import store from "./js_components/store.js";
import cardUI from "./js_components/cardUI.js";

import { checkOutDefaultUI } from "./js_components/checkOutDefaultUI.js";

import handlerCheckOut from "./js_components/handlerCheckOut.js";
import { handlerDesertsContainer } from "./js_components/handlerDesertsContainer.js";
import handlerModal from "./js_components/handlerModal.js";

async function loadJSON() {
  const jsonData = await fetch("./data.json");
  const data = await jsonData.json();
  return data;
}

import handlerDesertsContainerMobile from "./js_components/handlerDesertsContainerMobile.js";
import { handlerCheckOutMobile } from "./js_components/handlerCheckOutUIMobile.js";

function renderJSONMarkUp(data) {
  data.forEach((element, index) => {
    store.allItems.push({
      name: element.name,
      price: element.price,
      category: element.category,
      images: element.image,
      id: index,
      quantity: 0,
      sum: 0,
      quantityTotal: 0,
    });
  });
  cardUI();
  checkOutDefaultUI();
}

const uiWidth = () => {
  const clientWidth = document.documentElement.clientWidth;
  return clientWidth;
};

async function init(width) {
  if (width > 1200) {
    const data = await loadJSON();
    renderJSONMarkUp(data);
    handlerDesertsContainer();
    handlerCheckOut();
    handlerModal();
  } else if (width < 429) {
    const data = await loadJSON();
    renderJSONMarkUp(data);
    handlerDesertsContainerMobile();
    handlerCheckOutMobile();
  }
}

init(uiWidth());
