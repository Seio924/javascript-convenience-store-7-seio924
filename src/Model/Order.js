import { getTodayDate } from '../utils.js';
import Product from './Product.js';

class Order {
  #orderList;
  #orderDate;

  constructor() {
    this.#orderList = [];
    this.#orderDate = getTodayDate();
  }

  setOrderList(purchasedItems) {
    purchasedItems.map(purchasedItem => {
      this.#orderList.push(
        new Product({
          name: purchasedItem.name,
          price: null,
          quantity: purchasedItem.quantity,
          promotion: null,
        })
      );
    });
  }

  addPromotionToOrder(productStorage) {
    this.#orderList.forEach(orderProduct => {
      const promotion = productStorage.getProductPromotion(
        orderProduct.getProduct().name
      );

      if (promotion) {
        orderProduct.setPromotion(promotion);
      }
    });
  }

  getOrder() {
    return Object.freeze({
      orderList: this.#orderList,
      orderDate: this.#orderDate,
    });
  }
}

export default Order;
