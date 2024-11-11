import Order from '../../src/Model/Order';
import Product from '../../src/Model/Product';
import ProductStorage from '../../src/Model/ProductStorage';
import Promotions from '../../src/Model/Promotions';

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

  test.each([
    [{ name: '콜라', quantity: 5 }, true],
    [{ name: '사이다', quantity: 10 }, true],
    [{ name: '콜라', quantity: 15 }, true],
    [{ name: '에너지바', quantity: 6 }, false],
  ])(
    '구매 수량과 각 상품의 재고 수량을 고려하여 재료 부족 여부를 확인한다.',
    async (purchasedItem, expectedOutput) => {
      const order = new Order();
      const productStorage = new ProductStorage();

      productStorage.fillProductStorage();
      order.setOrderList([purchasedItem]);

      const orderList = order.getOrder().orderList;
      const orderProduct = orderList[0];

      const result = productStorage.checkStockAvailability(orderProduct);

      expect(result).toBe(expectedOutput);
    }
  );

  test.each([
    ['콜라', '탄산2+1'],
    ['감자칩', '반짝할인'],
    ['오렌지주스', 'MD추천상품'],
    ['비타민워터', null],
  ])(
    '상품 이름을 통해 적용된 프로모션 유무를 확인한다.',
    (productName, expectedOutput) => {
      const productStorage = new ProductStorage();

      productStorage.fillProductStorage();
      const promotion = productStorage.getProductPromotion(productName);

      expect(promotion).toBe(expectedOutput);
    }
  );

  test.each([
    ['콜라', '탄산2+1', [{ name: '콜라', quantity: 5 }], 5, 10],
    ['콜라', '탄산2+1', [{ name: '콜라', quantity: 12 }], 0, 8],
  ])(
    '고객이 상품을 구매할 때마다, 결제된 수량만큼 해당 상품의 재고에서 차감하여 수량을 관리한다. (프로모션 O)',
    (
      name,
      promotionName,
      orderList,
      expectedPromotionQuantity,
      expectedNonPromotionQuantity
    ) => {
      const order = new Order();
      order.setOrderList(orderList);

      const productStorage = new ProductStorage();
      productStorage.fillProductStorage();

      const promotions = new Promotions();
      promotions.setPromotions();

      order.addPromotionToOrder(productStorage, promotions.getPromotions());

      productStorage.updateStockForOrder(order);

      const updatedPromotionQuantity =
        productStorage.getProductQuantityByPromotion(name, promotionName);
      const updatedNonPromotionQuantity =
        productStorage.getProductQuantityByPromotion(name, null);

      expect(updatedPromotionQuantity).toBe(expectedPromotionQuantity);
      expect(updatedNonPromotionQuantity).toBe(expectedNonPromotionQuantity);
    }
  );

  test.each([
    ['에너지바', [{ name: '에너지바', quantity: 5 }], 0],
    ['정식도시락', [{ name: '정식도시락', quantity: 2 }], 6],
  ])(
    '고객이 상품을 구매할 때마다, 결제된 수량만큼 해당 상품의 재고에서 차감하여 수량을 관리한다. (프로모션 X)',
    (name, orderList, expectedNonPromotionQuantity) => {
      const order = new Order();
      order.setOrderList(orderList);

      const productStorage = new ProductStorage();
      productStorage.fillProductStorage();

      const promotions = new Promotions();
      promotions.setPromotions();

      order.addPromotionToOrder(productStorage, promotions.getPromotions());

      productStorage.updateStockForOrder(order);

      const updatedNonPromotionQuantity =
        productStorage.getProductQuantityByPromotion(name, null);

      expect(updatedNonPromotionQuantity).toBe(expectedNonPromotionQuantity);
    }
  );
});
