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
});
