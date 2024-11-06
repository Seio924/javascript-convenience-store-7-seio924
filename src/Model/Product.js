class Product {
  #name;
  #price;
  #quantity;
  #promotion;

  constructor({ name, price, quantity, promotion }) {
    this.#name = name;
    this.#price = Number(price);
    this.#quantity = quantity;
    this.#promotion = promotion;

    if (promotion === 'null') {
      this.#promotion = null;
    }
  }

  getProduct() {
    return Object.freeze({
      name: this.#name,
      price: this.#price,
      quantity: this.#quantity,
      promotion: this.#promotion,
    });
  }
}

export default Product;
