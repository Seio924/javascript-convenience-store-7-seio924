import { getTodayDate } from '../utils.js';

class Order {
  #purchasedItems;
  #orderDate;

  constructor(purchasedItems) {
    this.#purchasedItems = purchasedItems;
    this.#orderDate = getTodayDate();
  }

  getOrder() {
    return Object.freeze({
      purchasedItems: this.#purchasedItems,
      orderDate: this.#orderDate,
    });
  }
}

export default Order;
