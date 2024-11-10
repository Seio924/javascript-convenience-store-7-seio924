import Product from '../../src/Model/Product';

describe('Product 테스트', () => {
  test('물품을 생성한다.', async () => {
    const expectedProduct = {
      name: '콜라',
      price: 1000,
      quantity: 10,
      promotion: '탄산2+1',
    };

    const product = new Product({
      name: '콜라',
      price: '1000',
      quantity: '10',
      promotion: '탄산2+1',
    });

    expect(product.getProduct().name).toBe(expectedProduct.name);
    expect(product.getProduct().price).toBe(expectedProduct.price);
    expect(product.getProduct().quantity).toBe(expectedProduct.quantity);
    expect(product.getProduct().promotion).toBe(expectedProduct.promotion);
  });

  test.each([
    [
      { name: '콜라', price: '1000', quantity: '10', promotion: '탄산2+1' },
      3,
      7,
    ],
    [
      { name: '사이다', price: '800', quantity: '5', promotion: '탄산2+1' },
      2,
      3,
    ],
  ])(
    '수량을 차감한다.',
    (productData, quantityToDecrease, expectedQuantity) => {
      const product = new Product(productData);

      product.decreaseQuantity(quantityToDecrease);
      expect(product.getProduct().quantity).toBe(expectedQuantity);
    }
  );

  test.each([
    [
      { name: '콜라', price: '1000', quantity: '7', promotion: '탄산2+1' },
      3,
      10,
    ],
    [
      { name: '사이다', price: '800', quantity: '5', promotion: '탄산2+1' },
      2,
      7,
    ],
  ])('수량을 더한다.', (productData, quantityToIncrease, expectedQuantity) => {
    const product = new Product(productData);

    product.increaseQuantity(quantityToIncrease);
    expect(product.getProduct().quantity).toBe(expectedQuantity);
  });
});
