import { MissionUtils } from '@woowacourse/mission-utils';
import fs from 'fs';

export async function readInput(string) {
  return await MissionUtils.Console.readLineAsync(string);
}

export async function printOutput(string) {
  MissionUtils.Console.print(string);
}

export function parseProducts(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');
  const lines = data.trim().split('\n');
  const header = lines[0].split(',');
  const products = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const product = {};
    for (let j = 0; j < header.length; j++) {
      product[header[j].trim()] = values[j].trim();
    }
    products.push(product);
  }

  return products;
}
