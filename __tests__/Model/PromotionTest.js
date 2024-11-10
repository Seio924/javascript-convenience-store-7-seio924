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
      { name: '콜라', price: 1000, quantity: 10, promotion: '탄산2+1' },
      {
        name: '탄산2+1',
        buy: 2,
        get: 1,
        start_date: '2024-01-01',
        end_date: '2024-12-31',
      },
      { name: '콜라', isAdditionalPurchasePossible: false, fullSets: 3 },
    ],
    [
      { name: '사이다', price: 1000, quantity: 7, promotion: '탄산2+1' },
      {
        name: '탄산2+1',
        buy: 2,
        get: 1,
        start_date: '2024-01-01',
        end_date: '2024-12-31',
      },
      { name: '사이다', isAdditionalPurchasePossible: false, fullSets: 2 },
    ],
    [
      { name: '오렌지주스', price: 1800, quantity: 9, promotion: 'MD추천상품' },
      {
        name: 'MD추천상품',
        buy: 1,
        get: 1,
        start_date: '2024-01-01',
        end_date: '2024-12-31',
      },
      { name: '오렌지주스', isAdditionalPurchasePossible: true, fullSets: 4 },
    ],
  ])(
    '프로모션 조건에 따라 각 상품의 추가 구매 가능 여부와 무료 증정 수량을 계산한다.',
    (orderItem, promotionData, expectedOutput) => {
      const orderProduct = new Product(orderItem);

      const promotion = new Promotion(promotionData);

      expect(promotion.calculateFreeGift(orderProduct)).toEqual(expectedOutput);
    }
  );
});
