import { readInput } from '../utils.js';

class InputView {
  async readPurchaseInput() {
    const purchaseInput = await readInput(
      '구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])'
    );
    let purchasedItems = [];
    const purchases = purchaseInput.split(',').map(name => name.trim());

    purchases.map(purchase => {
      const [name, quantity] = purchase.match(/\[(.*?)\]/)[1].split('-');
      purchasedItems.push({ name: name, quantity: Number(quantity) });
    });

    return purchasedItems;
  }
}

export default InputView;
