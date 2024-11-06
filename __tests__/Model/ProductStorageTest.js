import Product from '../../src/Model/Product';
import ProductStorage from '../../src/Model/ProductStorage';

describe('ProductStorage 테스트', () => {
  test('물품 저장소에 물품 목록에 맞게 재고를 채워넣는다.', async () => {
    const expectedProducts = [
      new Product({
        name: '콜라',
        price: '1000',
        quantity: '10',
        promotion: '탄산2+1',
      }),
      new Product({
        name: '콜라',
        price: '1000',
        quantity: '10',
        promotion: 'null',
      }),
      new Product({
        name: '사이다',
        price: '1000',
        quantity: '8',
        promotion: '탄산2+1',
      }),
      new Product({
        name: '사이다',
        price: '1000',
        quantity: '7',
        promotion: 'null',
      }),
      new Product({
        name: '오렌지주스',
        price: '1800',
        quantity: '9',
        promotion: 'MD추천상품',
      }),
      new Product({
        name: '탄산수',
        price: '1200',
        quantity: '5',
        promotion: '탄산2+1',
      }),
      new Product({
        name: '물',
        price: '500',
        quantity: '10',
        promotion: 'null',
      }),
      new Product({
        name: '비타민워터',
        price: '1500',
        quantity: '6',
        promotion: 'null',
      }),
      new Product({
        name: '감자칩',
        price: '1500',
        quantity: '5',
        promotion: '반짝할인',
      }),
      new Product({
        name: '감자칩',
        price: '1500',
        quantity: '5',
        promotion: 'null',
      }),
      new Product({
        name: '초코바',
        price: '1200',
        quantity: '5',
        promotion: 'MD추천상품',
      }),
      new Product({
        name: '초코바',
        price: '1200',
        quantity: '5',
        promotion: 'null',
      }),
      new Product({
        name: '에너지바',
        price: '2000',
        quantity: '5',
        promotion: 'null',
      }),
      new Product({
        name: '정식도시락',
        price: '6400',
        quantity: '8',
        promotion: 'null',
      }),
      new Product({
        name: '컵라면',
        price: '1700',
        quantity: '1',
        promotion: 'MD추천상품',
      }),
      new Product({
        name: '컵라면',
        price: '1700',
        quantity: '10',
        promotion: 'null',
      }),
    ];

    const productStorage = new ProductStorage();
    productStorage.fillProductStorage();
    const products = productStorage.getProductStorage();

    expectedProducts.forEach((expectedProduct, index) => {
      expect(products[index].name).toBe(expectedProduct.name);
      expect(products[index].price).toBe(expectedProduct.price);
      expect(products[index].quantity).toBe(expectedProduct.quantity);
      expect(products[index].promotion).toBe(expectedProduct.promotion);
    });
  });
});
