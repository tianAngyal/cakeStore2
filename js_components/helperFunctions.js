import store from "./store.js";
import { indexOfSearchedElement } from "./handlerDesertsContainer.js";

const sumPrice = (element) => {
  const sum = element.price * element.quantity;
  return sum;
};
const deductPrice = (element) => {
  const deduct = element.sum - element.price;
  return deduct;
};
const addTotalPrice = (element) => {
  // const newTotal =
  //   store.priceTotal + store.addedToCard[indexOfSearchedElement].price;
  const newTotal = store.priceTotal + element.price;

  store.priceTotal = newTotal;
};
const reduceTotalPrice = (element) => {
  const newTotal = store.priceTotal - element.price;

  store.priceTotal = newTotal;
};

export { addTotalPrice, reduceTotalPrice, sumPrice, deductPrice };
