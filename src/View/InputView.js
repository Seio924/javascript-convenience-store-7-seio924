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

  async askForPromotionAddition(product, quantity) {
    const wantsToAddPromotionItem = await readInput(
      `현재 ${product}은(는) ${quantity}개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)`
    );

    if (wantsToAddPromotionItem === 'Y') {
      return true;
    } else if (wantsToAddPromotionItem === 'N') {
      return false;
    }
  }

  async askForFullPricePayment(product, quantity) {
    const wantsFullPricePayment = await readInput(
      `현재 ${product} ${quantity}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)`
    );

    if (wantsFullPricePayment === 'Y') {
      return true;
    } else if (wantsFullPricePayment === 'N') {
      return false;
    }
  }
}

export default InputView;
