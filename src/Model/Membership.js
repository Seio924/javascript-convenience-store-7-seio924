class Membership {
  #discountRate;

  constructor(discountRate) {
    this.#discountRate = discountRate / 100;
  }

}

export default Membership;
