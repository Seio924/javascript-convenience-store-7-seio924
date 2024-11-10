import Order from '../../src/Model/Order';
import Product from '../../src/Model/Product';
import ProductStorage from '../../src/Model/ProductStorage';
import Promotion from '../../src/Model/Promotion';
import Promotions from '../../src/Model/Promotions';

describe('Promotions 테스트', () => {
  test('프로모션 목록을 설정한다.', async () => {
    const expectedPromotions = [
      new Promotion({
        name: '탄산2+1',
        buy: '2',
        get: '1',
        start_date: '2024-01-01',
        end_date: '2024-12-31',
      }),
      new Promotion({
        name: 'MD추천상품',
        buy: '1',
        get: '1',
        start_date: '2024-01-01',
        end_date: '2024-12-31',
      }),
      new Promotion({
        name: '반짝할인',
        buy: '1',
        get: '1',
        start_date: '2024-11-01',
        end_date: '2024-11-30',
      }),
    ];

    const promotions = new Promotions();
    promotions.setPromotions();
    const promotionList = promotions.getPromotions();

    expectedPromotions.forEach((expectedPromotion, index) => {
      expect(promotionList[index].name).toBe(expectedPromotion.name);
      expect(promotionList[index].buy).toBe(expectedPromotion.buy);
      expect(promotionList[index].get).toBe(expectedPromotion.get);
      expect(promotionList[index].start_date).toBe(
        expectedPromotion.start_date
      );
      expect(promotionList[index].end_date).toBe(expectedPromotion.end_date);
    });
  });

  test.each([
    [
      [
        { name: '콜라', price: 1000, quantity: 11, promotion: '탄산2+1' },
        { name: '사이다', price: 1000, quantity: 7, promotion: '탄산2+1' },
      ],
      [
        {
          name: '콜라',
          isStockShortage: true,
          isAdditionalPurchasePossible: null,
          fullSets: 3,
          remainder: 2,
        },
        {
          name: '사이다',
          isStockShortage: false,
          isAdditionalPurchasePossible: null,
          fullSets: 2,
          remainder: 1,
        },
      ],
    ],
    [
      [
        {
          name: '오렌지주스',
          price: 1800,
          quantity: 7,
          promotion: 'MD추천상품',
        },
        { name: '초코바', price: 500, quantity: 5, promotion: 'MD추천상품' },
      ],
      [
        {
          name: '오렌지주스',
          isStockShortage: false,
          isAdditionalPurchasePossible: 1,
          fullSets: 3,
          remainder: 1,
        },
        {
          name: '초코바',
          isStockShortage: false,
          isAdditionalPurchasePossible: null,
          fullSets: 2,
          remainder: 1,
        },
      ],
    ],
  ])(
    '프로모션 조건에 따라 모든 상품의 추가 구매 가능 여부, 프로모션 재고 부족 여부, 무료 증정 수량을 계산한다.',
    (purchasedItem, expectedOutput) => {
      const productStorage = new ProductStorage();
      productStorage.fillProductStorage();

      const order = new Order();
      order.setOrderList(purchasedItem);
      order.addPromotionToOrder(productStorage);

      const promotions = new Promotions();
      promotions.setPromotions();

      expect(promotions.checkPromotionInOrder(productStorage, order)).toEqual(
        expectedOutput
      );
    }
  );
});
