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
});
