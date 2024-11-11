class Membership {
  #discountRate;

  constructor(discountRate) {
    this.#discountRate = discountRate / 100;
  }

  applyDiscountToNonPromotedProducts(nonPromotedProducts) {
    const totalPrice = nonPromotedProducts.reduce((sum, product) => {
      return sum + product.getProduct().price;
    }, 0);

    const discountAmount = totalPrice * this.#discountRate;

    return discountAmount;
  }
}

export default Membership;
