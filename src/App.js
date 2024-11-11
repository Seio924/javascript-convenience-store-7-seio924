import ConvenienceStoreController from './Controller/ConvenienceStoreController.js';
import Membership from './Model/Membership.js';
import ProductStorage from './Model/ProductStorage.js';
import Promotions from './Model/Promotions.js';
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

    const convenienceStoreController = new ConvenienceStoreController(
      productStorage,
      promotions,
      membership,
      inputView,
      outputView
    );

    await convenienceStoreController.run();
  }
}

export default App;
