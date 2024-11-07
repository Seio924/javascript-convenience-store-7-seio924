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

  test.each([
    [['Y'], '사이다', 1, true],
    [['N'], '콜라', 2, false],
    [['Y'], '오렌지주스', 3, true],
    [['N'], '탄산수', 1, false],
  ])(
    '프로모션 상품에 대한 추가 여부를 입력받는다.',
    async (purchaseInput, product, quantity, expectedOutput) => {
      mockQuestions(purchaseInput);

      const inputView = new InputView();
      const isAddingPromotionItem = await inputView.askForPromotionAddition(
        product,
        quantity
      );

      expect(isAddingPromotionItem).toEqual(expectedOutput);
    }
  );
});
