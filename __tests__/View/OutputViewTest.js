import Product from '../../src/Model/Product';
import OutputView from '../../src/View/OutputView';
import { expectLogContains, getLogSpy, getOutput } from '../ApplicationTest';

describe('OutputView 테스트', () => {
  test('편의점 소개를 출력한다.', () => {
    const logSpy = getLogSpy();
    const expectedOutputs = [
      '안녕하세요. W편의점입니다.',
      '현재 보유하고 있는 상품입니다.',
    ];

    const outputView = new OutputView();
    outputView.printConvenienceStoreDetails();
    const output = getOutput(logSpy);

    expectLogContains(output, expectedOutputs);
  });

  test('재고 현황을 출력한다.', () => {
    const logSpy = getLogSpy();
    const products = [
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
    ];
    const expectedOutputs = [
      '- 콜라 1,000원 10개 탄산2+1',
      '- 콜라 1,000원 10개',
      '- 사이다 1,000원 8개 탄산2+1',
    ];

    const outputView = new OutputView();
    outputView.printProducts(products);
    const output = getOutput(logSpy);

    expectLogContains(output, expectedOutputs);
  });

  test('구매 상품 내역을 출력한다.', () => {
    const logSpy = getLogSpy();
    const expectedOutputs = [
      '===========W 편의점=============',
      '상품명\t\t수량\t금액',
      '콜라\t\t3\t3,000원',
      '사이다\t\t2\t3,000원',
    ];
    const orderList = [
      new Product({ name: '콜라', price: 1000, quantity: 3, promotion: null }),
      new Product({
        name: '사이다',
        price: 1500,
        quantity: 2,
        promotion: null,
      }),
    ];

    const outputView = new OutputView();
    outputView.printOrderList(orderList);

    const output = getOutput(logSpy);

    expectLogContains(output, expectedOutputs);
  });
});
