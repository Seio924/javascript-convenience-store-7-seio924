import InputView from '../../src/View/InputView';
import { mockQuestions } from '../ApplicationTest';

describe('InputView 테스트', () => {
  test.each([
    [
      ['[콜라-3],[에너지바-5]'],
      [
        { name: '콜라', quantity: 3 },
        { name: '에너지바', quantity: 5 },
      ],
    ],
    [['[초코바-4]'], [{ name: '초코바', quantity: 4 }]],
    [
      ['[물-10],[비타민워터-6]'],
      [
        { name: '물', quantity: 10 },
        { name: '비타민워터', quantity: 6 },
      ],
    ],
  ])(
    '구매할 상품과 수량을 입력 받는다.',
    async (purchaseInput, expectedOutput) => {
      mockQuestions(purchaseInput);

      const inputView = new InputView();
      const purchasedItems = await inputView.readPurchaseInput();

      expect(purchasedItems).toEqual(expectedOutput);
    }
  );

  test.each([
    [
      ['[초코바.4]', '[물-10]'],
      '[ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.',
    ],
    [
      ['[사이다-5], [오렌지주스]', '[감자칩 1]'],
      '[ERROR] 올바르지 않은 형식으로 입력했습니다. 다시 입력해 주세요.',
    ],
  ])(
    '잘못된 형식의 입력이 들어올 경우 에러를 던진다.',
    async (invalidInput, expectedError) => {
      mockQuestions(invalidInput);

      const inputView = new InputView();

      await expect(inputView.readPurchaseInput()).rejects.toThrowError(
        expectedError
      );
    }
  );

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

  test.each([
    [['Y'], true],
    [['N'], false],
    [['Y'], true],
    [['N'], false],
  ])(
    '일부 수량에 대해 정가로 결제할지 여부를 입력받는다.',
    async (purchaseInput, expectedOutput) => {
      mockQuestions(purchaseInput);

      const inputView = new InputView();
      const wantsFullPricePayment = await inputView.askForFullPricePayment(
        'test',
        4
      );

      expect(wantsFullPricePayment).toEqual(expectedOutput);
    }
  );

  test.each([
    [['Y'], true],
    [['N'], false],
    [['Y'], true],
    [['N'], false],
  ])('멤버십 할인 적용 여부를 입력 받는다.', async (input, expectedOutput) => {
    mockQuestions(input);

    const inputView = new InputView();
    const wantsMembershipDiscount = await inputView.askForMembershipDiscount();

    expect(wantsMembershipDiscount).toEqual(expectedOutput);
  });

  test.each([
    [['Y'], true],
    [['N'], false],
    [['Y'], true],
    [['N'], false],
  ])('추가 구매 여부를 입력 받는다.', async (input, expectedOutput) => {
    mockQuestions(input);

    const inputView = new InputView();
    const wantsForAdditionalPurchase =
      await inputView.askForAdditionalPurchase();

    expect(wantsForAdditionalPurchase).toEqual(expectedOutput);
  });
});
