import { MissionUtils } from '@woowacourse/mission-utils';
import fs from 'fs';

export async function readInput(string) {
  return await MissionUtils.Console.readLineAsync(string);
}

export async function printOutput(string) {
  MissionUtils.Console.print(string);
}

export function parseDataFromFile(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');
  const lines = data.trim().split('\n');
  const header = lines[0].split(',');
  const parsedData = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const item = {};
    for (let j = 0; j < header.length; j++) {
      item[header[j].trim()] = values[j].trim();
    }
    parsedData.push(item);
  }

  return parsedData;
}

export function getTodayDate() {
  const dateTimes = MissionUtils.DateTimes.now();
  const todayDate = dateTimes.toLocaleDateString('en-CA');
  return todayDate;
}
