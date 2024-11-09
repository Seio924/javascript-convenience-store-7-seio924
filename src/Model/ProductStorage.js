import { parseDataFromFile } from '../utils.js';
import Product from './Product.js';
import path from 'path';

class ProductStorage {
  #productStorage;

  constructor() {
    this.#productStorage = [];
  }

  fillProductStorage() {
    const filePath = path.join(process.cwd(), 'public/products.md');
    const products = parseDataFromFile(filePath);

    products.map(product => {
      console.log(product);
      this.#productStorage.push(new Product(product));
    });
  }

  getProductStorage() {
    return Object.freeze([...this.#productStorage]);
  }

  checkOrderStock(order) {
    let isStockSufficient = true;

    for (const orderProduct of order.getOrder().orderList) {
      if (!this.checkStockAvailability(orderProduct)) {
        isStockSufficient = false;
        break;
      }
    }

    return isStockSufficient;
  }

  checkStockAvailability(orderProduct) {
    const product = this.#productStorage.filter(
      p => p.getProduct().name === orderProduct.getProduct().name
    );

    let totalStock = 0;
    product.map(p => (totalStock += p.getProduct().quantity));

    if (orderProduct.getProduct().quantity > totalStock) {
      return false;
    }

    return true;
  }
}

export default ProductStorage;
