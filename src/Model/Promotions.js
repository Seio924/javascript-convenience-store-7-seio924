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

  checkPromotionInOrder(productStorage, order) {
    const freeGifts = [];

    order.getOrder().orderList.forEach(orderProduct => {
      const productName = orderProduct.getProduct().name;
      const productPromotion = orderProduct.getProduct().promotion;
      const purchaseQuantity = orderProduct.getProduct().quantity;

      if (productPromotion) {
        const promotion = this.#promotions.find(
          promo => promo.getPromotion().name === productPromotion
        );

        const promotionProductQuantity =
          productStorage.getProductQuantityByPromotion(
            productName,
            productPromotion
          );

        const {
          isStockShortage,
          isAdditionalPurchasePossible,
          fullSets,
          remainder,
        } = this.calculateFreeGiftBasedOnStock(
          purchaseQuantity,
          promotionProductQuantity,
          promotion
        );

        freeGifts.push({
          name: productName,
          isStockShortage,
          isAdditionalPurchasePossible,
          fullSets,
          remainder,
        });
      }
    });

    return freeGifts;
  }

  calculateFreeGiftBasedOnStock(
    purchaseQuantity,
    promotionProductQuantity,
    promotion
  ) {
    if (purchaseQuantity > promotionProductQuantity) {
      let { fullSets, remainder } = promotion.calculateFreeGift(
        promotionProductQuantity
      );

      remainder += purchaseQuantity - promotionProductQuantity;

      return {
        isStockShortage: true,
        isAdditionalPurchasePossible: false,
        fullSets,
        remainder,
      };
    }

    const { isAdditionalPurchasePossible, fullSets, remainder } =
      promotion.calculateFreeGift(purchaseQuantity);

    return {
      isStockShortage: false,
      isAdditionalPurchasePossible,
      fullSets,
      remainder,
    };
  }

  getPromotions() {
    return Object.freeze([...this.#promotions]);
  }
}

export default Promotions;
