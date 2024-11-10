import Order from './Model/Order.js';
import ProductStorage from './Model/ProductStorage.js';
import Promotions from './Model/Promotions.js';
import { printOutput } from './utils.js';
import InputView from './View/InputView.js';
import OutputView from './View/OutputView.js';

class App {
  async run() {
    const productStorage = new ProductStorage();
    const promotions = new Promotions();

    const inputView = new InputView();
    const outputView = new OutputView();

    productStorage.fillProductStorage();
    promotions.setPromotions();

    const products = productStorage.getProductStorage();
    const promotionList = promotions.getPromotions();

    outputView.printProducts(products);

    const order = await this.validateOrderStock(
      productStorage,
      inputView.readPurchaseInput
    );
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
}

export default App;
