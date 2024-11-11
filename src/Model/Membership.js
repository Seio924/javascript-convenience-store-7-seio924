class Membership {
  #discountRate;

  constructor(discountRate) {
    this.#discountRate = discountRate / 100;
  }

  applyDiscountToNonPromotedProducts(nonPromotedProducts) {
    const totalPrice = nonPromotedProducts.reduce((sum, product) => {
      return sum + product.getProduct().price * product.getProduct().quantity;
    }, 0);

    const discountAmount = totalPrice * this.#discountRate;

    return this.limitDiscountAmount(discountAmount);
  }

  limitDiscountAmount(discountAmount) {
    const maxDiscount = 8000;
    if (discountAmount > maxDiscount) {
      return maxDiscount;
    }

    return discountAmount;
  }
}

export default Membership;
