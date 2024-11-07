import Order from './Model/Order.js';
import InputView from './View/InputView.js';

class App {
  async run() {
    const inputView = new InputView();
    const purchasedItems = await inputView.readPurchaseInput();

    const order = new Order(purchasedItems);
    console.log(order.getOrder());
  }
}

export default App;
