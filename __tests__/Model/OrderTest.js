import Order from '../../src/Model/Order';
import Product from '../../src/Model/Product';
import ProductStorage from '../../src/Model/ProductStorage';
import { mockNowDate } from '../ApplicationTest';

describe('Order 테스트', () => {
  test('사용자가 입력한 구매할 상품과 수량으로 주문서를 생성한다.', async () => {
    const purchasedItems = [
      { name: '콜라', quantity: 2 },
      { name: '사이다', quantity: 3 },
    ];
    const testDate = '2024-11-07T00:00:00Z';
    const expectedOutputs = {
      orderList: [
        new Product({
          name: '콜라',
          price: null,
          quantity: 2,
          promotion: null,
        }),
        new Product({
          name: '사이다',
          price: null,
          quantity: 3,
          promotion: null,
        }),
      ],
      orderDate: '2024-11-07',
    };

    mockNowDate(testDate);

    const order = new Order();
    order.setOrderList(purchasedItems);

    expect(order.getOrder()).toEqual(expectedOutputs);
  });

  test.each([
    [
      [{ name: '콜라', quantity: 2 }],
      [
        new Product({
          name: '콜라',
          price: null,
          quantity: 2,
          promotion: '탄산2+1',
        }),
      ],
    ],
    [
      [{ name: '오렌지주스', quantity: 3 }],
      [
        new Product({
          name: '오렌지주스',
          price: null,
          quantity: 3,
          promotion: 'MD추천상품',
        }),
      ],
    ],
    [
      [{ name: '비타민워터', quantity: 3 }],
      [
        new Product({
          name: '비타민워터',
          price: null,
          quantity: 3,
          promotion: null,
        }),
      ],
    ],
  ])(
    '주문한 상품들 중 프로모션 행사가 진행되고 있는 상품에 프로모션 정보를 추가한다.',
    (purchasedItem, expectedOrderList) => {
      const productStorage = new ProductStorage();
      productStorage.fillProductStorage();

      const order = new Order();
      order.setOrderList(purchasedItem);
      order.addPromotionToOrder(productStorage);

      expect(order.getOrder().orderList).toEqual(expectedOrderList);
    }
  );
});
