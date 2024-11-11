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

  calculateFreeGift(quantity) {
    const promotionTotal = this.#buy + this.#get;

    const fullSets = Math.floor(quantity / promotionTotal) * this.#get;
    const remainder = quantity % promotionTotal;

    let isAdditionalPurchasePossible = null;

    if (remainder === this.#buy) {
      isAdditionalPurchasePossible = this.#get;
    }

    return {
      isAdditionalPurchasePossible,
      fullSets,
      remainder,
    };
  }

  isPromotionActive(currentDate) {
    const date = new Date(currentDate);
    const start_date = new Date(this.#start_date);
    const end_date = new Date(this.#end_date);
    return date >= start_date && date <= end_date;
  }
}

export default Promotion;
