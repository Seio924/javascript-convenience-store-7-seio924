import Product from '../../src/Model/Product';
import Promotion from '../../src/Model/Promotion';

describe('Promotion 테스트', () => {
  test('프로모션 조건을 설정한다.', async () => {
    const expectedPromotion = {
      name: '반짝할인',
      buy: 1,
      get: 1,
      start_date: '2024-11-01',
      end_date: '2024-11-30',
    };

    const promotion = new Promotion({
      name: '반짝할인',
      buy: '1',
      get: '1',
      start_date: '2024-11-01',
      end_date: '2024-11-30',
    });

    expect(promotion.getPromotion().name).toBe(expectedPromotion.name);
    expect(promotion.getPromotion().buy).toBe(expectedPromotion.buy);
    expect(promotion.getPromotion().get).toBe(expectedPromotion.get);
    expect(promotion.getPromotion().start_date).toBe(
      expectedPromotion.start_date
    );
    expect(promotion.getPromotion().end_date).toBe(expectedPromotion.end_date);
  });

  test.each([
    [
      10,
      {
        name: '탄산2+1',
        buy: 2,
        get: 1,
        start_date: '2024-01-01',
        end_date: '2024-12-31',
      },
      { isAdditionalPurchasePossible: false, fullSets: 3, remainder: 1 },
    ],
    [
      7,
      {
        name: '탄산2+1',
        buy: 2,
        get: 1,
        start_date: '2024-01-01',
        end_date: '2024-12-31',
      },
      { isAdditionalPurchasePossible: false, fullSets: 2, remainder: 1 },
    ],
    [
      9,
      {
        name: 'MD추천상품',
        buy: 1,
        get: 1,
        start_date: '2024-01-01',
        end_date: '2024-12-31',
      },
      { isAdditionalPurchasePossible: true, fullSets: 4, remainder: 1 },
    ],
  ])(
    '프로모션 조건에 따라 각 상품의 추가 구매 가능 여부와 무료 증정 수량을 계산한다.',
    (quantity, promotionData, expectedOutput) => {
      const promotion = new Promotion(promotionData);

      expect(promotion.calculateFreeGift(quantity)).toEqual(expectedOutput);
    }
  );
});
