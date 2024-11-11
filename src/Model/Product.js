class Product {
  #name;
  #price;
  #quantity;
  #promotion;

  constructor({ name, price, quantity, promotion }) {
    this.#name = name;
    this.#price = Number(price);
    this.#quantity = Number(quantity);
    this.#promotion = promotion;

    if (promotion === 'null') {
      this.#promotion = null;
    }
  }

  setPromotion(promotion) {
    this.#promotion = promotion;
  }

  setPrice(price) {
    this.#price = price;
  }

  decreaseQuantity(amount) {
    this.#quantity -= amount;
  }

  increaseQuantity(amount) {
    this.#quantity += amount;
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
