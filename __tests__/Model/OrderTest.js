import Order from '../../src/Model/Order';
import Product from '../../src/Model/Product';
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
});
