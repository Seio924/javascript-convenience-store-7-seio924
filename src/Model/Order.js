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

  addPrice(productStorage) {
    this.#orderList.forEach(orderProduct => {
      orderProduct.setPrice(productStorage.getProductPrice(orderProduct));
    });
  }

  decreaseProductQuantity(productName, quantityToSubtract) {
    const orderProduct = this.#orderList.find(
      product => product.getProduct().name === productName
    );

    orderProduct.decreaseQuantity(quantityToSubtract);
  }

  increaseProductQuantity(productName, quantityToAdd) {
    const orderProduct = this.#orderList.find(
      product => product.getProduct().name === productName
    );

    orderProduct.increaseQuantity(quantityToAdd);
  }

  getOrder() {
    return Object.freeze({
      orderList: this.#orderList,
      orderDate: this.#orderDate,
    });
  }
}

export default Order;
