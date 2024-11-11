import Membership from '../../src/Model/Membership';
import Product from '../../src/Model/Product';

describe('Membership 테스트', () => {
  test.each([
    [
      [
        new Product({
          name: '콜라',
          price: 1000,
          quantity: 1,
          promotion: null,
        }),
        new Product({
          name: '사이다',
          price: 2000,
          quantity: 1,
          promotion: null,
        }),
        new Product({
          name: '오렌지주스',
          price: 3000,
          quantity: 1,
          promotion: 'MD추천상품',
        }),
      ],
      30,
      1800,
    ],
    [
      [
        new Product({ name: '물', price: 500, quantity: 2, promotion: null }),
        new Product({
          name: '비타민워터',
          price: 1500,
          quantity: 1,
          promotion: null,
        }),
      ],
      30,
      600,
    ],
  ])(
    '물품에 대해 할인 금액을 계산한다.',
    (nonPromotedProducts, discountRate, expectedDiscountAmount) => {
      const membership = new Membership(discountRate);
      const discountAmount =
        membership.applyDiscountToNonPromotedProducts(nonPromotedProducts);

      expect(discountAmount).toBe(expectedDiscountAmount);
    }
  );
});
