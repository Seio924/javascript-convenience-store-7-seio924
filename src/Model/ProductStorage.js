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

    let productName = null;

    products.map(product => {
      if (product.name === productName) {
        this.#productStorage[this.#productStorage.length - 1].increaseQuantity(
          Number(product.quantity)
        );
      } else {
        this.#productStorage.push(new Product(product));
        if (product.promotion !== 'null') {
          this.#productStorage.push(
            new Product({
              name: product.name,
              price: product.price,
              quantity: 0,
              promotion: null,
            })
          );

          productName = product.name;
        }
      }
    });
  }

  getProductStorage() {
    return Object.freeze([...this.#productStorage]);
  }

  checkOrderStock(order) {
    for (const orderProduct of order.getOrder().orderList) {
      this.checkProductExists(orderProduct);
      this.checkStockAvailability(orderProduct);
    }
  }

  checkStockAvailability(orderProduct) {
    const product = this.#productStorage.filter(
      p => p.getProduct().name === orderProduct.getProduct().name
    );

    let totalStock = 0;
    product.map(p => (totalStock += p.getProduct().quantity));

    if (orderProduct.getProduct().quantity > totalStock) {
      throw new Error(
        '[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.'
      );
    }
  }

  checkProductExists(orderProduct) {
    const product = this.#productStorage.find(
      product => product.getProduct().name === orderProduct.getProduct().name
    );

    if (!product) {
      throw new Error('[ERROR] 존재하지 않는 상품입니다. 다시 입력해 주세요.');
    }
  }

  updateStockForOrder(order) {
    const orderList = order.getOrder().orderList;

    orderList.forEach(orderProduct => {
      const productName = orderProduct.getProduct().name;
      const productPromotion = orderProduct.getProduct().promotion;
      let orderQuantity = orderProduct.getProduct().quantity;
      let remain = false;

      if (productPromotion) {
        remain = this.updateStockForProductWithPromotion(
          productName,
          productPromotion,
          orderQuantity
        );
        orderQuantity = remain;
      }

      if (!productPromotion || remain) {
        this.updateStockForProductWithoutPromotion(productName, orderQuantity);
      }
    });
  }

  updateStockForProductWithPromotion(
    productName,
    productPromotion,
    orderQuantity
  ) {
    for (let product of this.#productStorage) {
      if (
        product.getProduct().name === productName &&
        product.getProduct().promotion === productPromotion
      ) {
        const productQuantity = product.getProduct().quantity;

        if (orderQuantity > productQuantity) {
          product.decreaseQuantity(productQuantity);
          orderQuantity -= productQuantity;
          return orderQuantity;
        } else {
          product.decreaseQuantity(orderQuantity);
          return false;
        }
      }
    }
  }

  updateStockForProductWithoutPromotion(productName, orderQuantity) {
    const product = this.#productStorage.find(
      product =>
        product.getProduct().name === productName &&
        product.getProduct().promotion === null
    );

    if (product) {
      product.decreaseQuantity(orderQuantity);
    }
  }

  getProductPrice(productName) {
    const product = this.#productStorage.find(
      p => p.getProduct().name === productName
    );

    return product.getProduct().price;
  }

  getProductPromotion(productName) {
    let promotion = null;

    this.#productStorage.forEach(product => {
      if (
        product.getProduct().name === productName &&
        product.getProduct().promotion !== null
      ) {
        promotion = product.getProduct().promotion;
      }
    });

    return promotion;
  }

  getProductQuantityByPromotion(productName, productPromotion) {
    for (let product of this.#productStorage) {
      if (
        product.getProduct().name === productName &&
        product.getProduct().promotion === productPromotion
      ) {
        return product.getProduct().quantity;
      }
    }
  }
}

export default ProductStorage;
