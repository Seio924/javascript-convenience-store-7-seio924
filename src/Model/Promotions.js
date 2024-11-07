import { parseDataFromFile } from '../utils.js';
import Promotion from './Promotion.js';
import path from 'path';

class Promotions {
  #promotions;

  constructor() {
    this.#promotions = [];
  }

  setPromotions() {
    const filePath = path.join(process.cwd(), 'public/promotions.md');
    const promotions = parseDataFromFile(filePath);

    promotions.map(promotion => {
      this.#promotions.push(
        new Promotion({
          name: promotion.name,
          buy: promotion.buy,
          get: promotion.get,
          start_date: promotion.start_date,
          end_date: promotion.end_date,
        })
      );
    });
  }

  getPromotions() {
    return Object.freeze([...this.#promotions]);
  }
}

export default Promotions;
