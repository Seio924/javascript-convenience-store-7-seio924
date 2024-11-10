class Promotion {
  #name;
  #buy;
  #get;
  #start_date;
  #end_date;

  constructor({ name, buy, get, start_date, end_date }) {
    this.#name = name;
    this.#buy = Number(buy);
    this.#get = Number(get);
    this.#start_date = start_date;
    this.#end_date = end_date;
  }

  getPromotion() {
    return Object.freeze({
      name: this.#name,
      buy: this.#buy,
      get: this.#get,
      start_date: this.#start_date,
      end_date: this.#end_date,
    });
  }

  calculateFreeGift(orderProduct) {
    const purchaseQuantity = orderProduct.getProduct().quantity;
    const promotionTotal = this.#buy + this.#get;

    const fullSets = Math.floor(purchaseQuantity / promotionTotal);
    const remainder = purchaseQuantity % promotionTotal;

    if (remainder === this.#buy) {
      return {
        name: orderProduct.getProduct().name,
        isAdditionalPurchasePossible: true,
        fullSets,
      };
    }

    return {
      name: orderProduct.getProduct().name,
      isAdditionalPurchasePossible: false,
      fullSets,
    };
  }
}

export default Promotion;
