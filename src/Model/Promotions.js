import { parseDataFromFile } from '../utils.js';
import Product from './Product.js';
import Promotion from './Promotion.js';
import path from 'path';

class Promotions {
  #promotions;

  constructor() {
    this.#promotions = [];
  }

  setPromotions() {
    const filePath = path.join(process.cwd(), 'public/promotions.md');
    const promotions = parseDataFromFile(filePath);

    promotions.map(promotion => {
      this.#promotions.push(
        new Promotion({
          name: promotion.name,
          buy: promotion.buy,
          get: promotion.get,
          start_date: promotion.start_date,
          end_date: promotion.end_date,
        })
      );
    });
  }

  checkPromotionInOrder(order) {
    const freeGifts = [];

    order.getOrder().orderList.forEach(orderProduct => {
      const productPromotion = orderProduct.getProduct().promotion;

      this.#promotions.forEach(promotion => {
        if (productPromotion === promotion.getPromotion().name) {
          const freeGift = promotion.calculateFreeGift(orderProduct);

          freeGifts.push({
            isAdditionalPurchasePossible: freeGift.isAdditionalPurchasePossible,
            freeProduct: new Product({
              name: freeGift.name,
              price: null,
              quantity: freeGift.quantity,
              promotion: null,
            }),
          });
        }
      });
    });

    return freeGifts;
  }

  getPromotions() {
    return Object.freeze([...this.#promotions]);
  }
}

export default Promotions;
