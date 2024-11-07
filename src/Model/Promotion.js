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
}

export default Promotion;
