import Membership from './Model/Membership.js';
import Order from './Model/Order.js';
import Product from './Model/Product.js';
import ProductStorage from './Model/ProductStorage.js';
import Promotions from './Model/Promotions.js';
import { printOutput } from './utils.js';
import InputView from './View/InputView.js';
import OutputView from './View/OutputView.js';

class App {
  async run() {
    const productStorage = new ProductStorage();
    const promotions = new Promotions();
    const membership = new Membership(30);

    const inputView = new InputView();
    const outputView = new OutputView();

    productStorage.fillProductStorage();
    promotions.setPromotions();

    const products = productStorage.getProductStorage();

    outputView.printProducts(products);

    const order = await this.validateOrderStock(
      productStorage,
      inputView.readPurchaseInput
    );
    order.addPrice(productStorage);
    order.addPromotionToOrder(productStorage);

    const promotionResultsForOrder = promotions.checkPromotionInOrder(
      productStorage,
      order
    );

    for (const result of promotionResultsForOrder) {
      if (result.isStockShortage) {
        const userWantsToProceed = await inputView.askForFullPricePayment(
          result.name,
          result.remainder
        );
        if (!userWantsToProceed) {
          order.decreaseProductQuantity(result.name, result.remainder);
          result.remainder = 0;
        }
      }

      if (result.isAdditionalPurchasePossible) {
        const userWantsToAddPromotion = await inputView.askForPromotionAddition(
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
    if (await inputView.askForMembershipDiscount()) {
      const nonPromotedProducts = this.getNonPromotedProducts(
        order,
        promotionResultsForOrder
      );

      membershipDiscountAmount =
        membership.applyDiscountToNonPromotedProducts(nonPromotedProducts);
    }

    outputView.printOrderList(order.getOrder().orderList);

    const freeGiftProducts = this.createFreeGiftProducts(
      promotionResultsForOrder,
      productStorage
    );

    outputView.printFreeGifts(freeGiftProducts);

    const orderTotalAmount = order.calculateTotalAmount();
    const orderTotalQuantity = order.calculateTotalQuantity();
    const promotionDiscountAmount =
      this.calculateFreeGiftTotalAmount(freeGiftProducts);

    outputView.printSummary(
      orderTotalAmount,
      orderTotalQuantity,
      promotionDiscountAmount,
      membershipDiscountAmount
    );
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

export default App;
