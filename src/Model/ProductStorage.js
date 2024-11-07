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
}

export default ProductStorage;
