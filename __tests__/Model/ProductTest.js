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
});
