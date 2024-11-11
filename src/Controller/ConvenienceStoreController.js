import { printOutput } from '../utils.js';
import Order from '../Model/Order.js';
import Product from '../Model/Product.js';

class ConvenienceStoreController {
  constructor(productStorage, promotions, membership, inputView, outputView) {
    this.productStorage = productStorage;
    this.promotions = promotions;
    this.membership = membership;
    this.inputView = inputView;
    this.outputView = outputView;
  }

  async run() {
    const products = this.productStorage.getProductStorage();

    this.outputView.printProducts(products);

    const order = await this.validateOrderStock(
      this.productStorage,
      this.inputView.readPurchaseInput
    );
    order.addPrice(this.productStorage);
    order.addPromotionToOrder(
      this.productStorage,
      this.promotions.getPromotions()
    );

    const promotionResultsForOrder = this.promotions.checkPromotionInOrder(
      this.productStorage,
      order
    );

    for (const result of promotionResultsForOrder) {
      if (result.isStockShortage) {
        const userWantsToProceed = await this.validateYN(
          this.inputView.askForFullPricePayment,
          result.name,
          result.remainder
        );
        if (!userWantsToProceed) {
          order.decreaseProductQuantity(result.name, result.remainder);
          result.remainder = 0;
        }
      }

      if (result.isAdditionalPurchasePossible) {
        const userWantsToAddPromotion = await this.validateYN(
          this.inputView.askForPromotionAddition,
          result.name,
          result.isAdditionalPurchasePossible
        );
        if (userWantsToAddPromotion) {
          order.increaseProductQuantity(
            result.name,
            result.isAdditionalPurchasePossible
          );
          result.fullSets += result.isAdditionalPurchasePossible;
        }
      }
    }

    let membershipDiscountAmount = 0;
    const userWantsMembershipDiscount = await this.validateYN(
      this.inputView.askForMembershipDiscount
    );

    if (userWantsMembershipDiscount) {
      const nonPromotedProducts = this.getNonPromotedProducts(
        order,
        promotionResultsForOrder
      );

      membershipDiscountAmount =
        this.membership.applyDiscountToNonPromotedProducts(nonPromotedProducts);
    }

    this.outputView.printOrderList(order.getOrder().orderList);

    const freeGiftProducts = this.createFreeGiftProducts(
      promotionResultsForOrder,
      this.productStorage
    );

    this.outputView.printFreeGifts(freeGiftProducts);

    const orderTotalAmount = order.calculateTotalAmount();
    const orderTotalQuantity = order.calculateTotalQuantity();
    const promotionDiscountAmount =
      this.calculateFreeGiftTotalAmount(freeGiftProducts);

    this.outputView.printSummary(
      orderTotalAmount,
      orderTotalQuantity,
      promotionDiscountAmount,
      membershipDiscountAmount
    );

    this.productStorage.updateStockForOrder(order);

    const userWantsToAddMoreItems = await this.validateYN(
      this.inputView.askForAdditionalPurchase
    );

    if (userWantsToAddMoreItems) {
      await this.run();
    }
  }

  async validateOrderStock(productStorage, readPurchaseInput) {
    try {
      const purchasedItems = await readPurchaseInput();
      const order = new Order();
      order.setOrderList(purchasedItems);

      productStorage.checkOrderStock(order);

      return order;
    } catch (error) {
      printOutput(error.message);
      return this.validateOrderStock(productStorage, readPurchaseInput);
    }
  }

  async validateYN(inputViewFunction, ...args) {
    try {
      const answer = await inputViewFunction(...args);
      return answer;
    } catch (error) {
      printOutput(error.message);
      return this.validateYN(inputViewFunction, ...args);
    }
  }

  getNonPromotedProducts(order, promotionResultsForOrder) {
    const nonPromotedProducts = order
      .getOrder()
      .orderList.filter(orderProduct => {
        const productName = orderProduct.getProduct().name;

        const isPromoted = promotionResultsForOrder.some(
          result => result.name === productName
        );

        return !isPromoted;
      });

    return nonPromotedProducts;
  }

  createFreeGiftProducts(promotionResultsForOrder, productStorage) {
    return promotionResultsForOrder.map(result => {
      const price = productStorage.getProductPrice(result.name);

      return new Product({
        name: result.name,
        price: price,
        quantity: result.fullSets,
        promotion: null,
      });
    });
  }

  calculateFreeGiftTotalAmount(freeGiftProducts) {
    return freeGiftProducts.reduce((total, freeGift) => {
      const productInfo = freeGift.getProduct();
      return total + productInfo.price * productInfo.quantity;
    }, 0);
  }
}

export default ConvenienceStoreController;
