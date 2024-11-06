import InputView from '../../src/View/InputView';
import { mockQuestions } from '../ApplicationTest';

describe('InputView 테스트', () => {
  test('구매할 상품과 수량을 입력 받는다.', async () => {
    const purchaseInput = ['[콜라-3],[에너지바-5]'];
    const expectedOutputs = [
      { name: '콜라', quantity: 3 },
      { name: '에너지바', quantity: 5 },
    ];

    mockQuestions(purchaseInput);

    const inputView = new InputView();
    const purchasedItems = await inputView.readPurchaseInput();

    expect(purchasedItems).toEqual(expectedOutputs);
  });
});
