import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ScrapperService {
  async getDataViaPuppeteer(
    method: string = '',
    amount: string = '',
    currency: string = '',
  ) {
    const URL = `https://garantex.io/p2p?utf8=%E2%9C%93&payment_method=${method}&amount=${amount}&currency=${currency}&commit=Search`;
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    await page.goto(URL, {
      waitUntil: 'networkidle2',
    });

    const results = await page.evaluate(() => {
      const propertyList = [];

      document
        .querySelectorAll(
          '#transactions > div > div > table.table.table-condensed.table-striped.sell_table > tbody > tr',
        )
        .forEach((tr) => {
          const data = {
            seller: tr.querySelector('tr > td:nth-child(1) > div ')
              ?.textContent,
            method: tr.querySelector('tr > td:nth-child(2) > div')?.textContent,
            price: tr.querySelector('tr > td:nth-child(3)')?.textContent,
            limit: tr.querySelector('tr > td:nth-child(4)')?.textContent,
          };

          propertyList.push(data);
        });

      return propertyList;
    });

    console.log('getDataViaPuppeteer results :', results);
    await browser.close();
    return results;
  }
}
