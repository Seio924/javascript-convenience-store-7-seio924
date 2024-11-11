import { printOutput } from '../utils.js';

class OutputView {
  printConvenienceStoreDetails() {
    printOutput('안녕하세요. W편의점입니다.');
    printOutput('현재 보유하고 있는 상품입니다.\n');
  }

  printProducts(products) {
    products.map(product => {
      const productInfo = product.getProduct();
      let output = `- ${
        productInfo.name
      } ${productInfo.price.toLocaleString()}원 ${productInfo.quantity}개`;

      if (productInfo.promotion) {
        output += ` ${productInfo.promotion}`;
      }
      printOutput(output);
    });
  }

  printOrderList(orderList) {
    printOutput('===========W 편의점=============');
    printOutput('상품명\t\t수량\t금액');

    orderList.forEach(orderProduct => {
      const productInfo = orderProduct.getProduct();
      const totalPrice = productInfo.price * productInfo.quantity;
      const formattedTotalPrice = totalPrice.toLocaleString();

      printOutput(
        `${productInfo.name}\t\t${productInfo.quantity}\t${formattedTotalPrice}원`
      );
    });
  }
}

export default OutputView;
