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
}

export default OutputView;
