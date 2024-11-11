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

  addPromotionToOrder(productStorage, promotions) {
    const orderDate = this.#orderDate;

    this.#orderList.forEach(orderProduct => {
      const productPromotion = productStorage.getProductPromotion(
        orderProduct.getProduct().name
      );

      const promotion = promotions.find(
        promo => promo.getPromotion().name === productPromotion
      );

      if (promotion) {
        if (promotion.isPromotionActive(orderDate)) {
          orderProduct.setPromotion(promotion.getPromotion().name);
        }
      }
    });
  }

  addPrice(productStorage) {
    this.#orderList.forEach(orderProduct => {
      orderProduct.setPrice(
        productStorage.getProductPrice(orderProduct.getProduct().name)
      );
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

  calculateTotalAmount() {
    return this.#orderList.reduce((total, orderProduct) => {
      const productInfo = orderProduct.getProduct();
      return total + productInfo.price * productInfo.quantity;
    }, 0);
  }

  calculateTotalQuantity() {
    return this.#orderList.reduce((total, orderProduct) => {
      const productInfo = orderProduct.getProduct();
      return total + productInfo.quantity;
    }, 0);
  }

  getOrder() {
    return Object.freeze({
      orderList: this.#orderList,
      orderDate: this.#orderDate,
    });
  }
}

export default Order;
