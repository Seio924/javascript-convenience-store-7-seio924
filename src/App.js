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

    console.log(promotions.checkPromotionInOrder(productStorage, order));
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
