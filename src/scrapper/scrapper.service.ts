import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class ScrapperService {
  async scrapeBoardLists() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
      await page.goto('https://www.skku.edu/skku/campus/skk_comm/notice01.do');

      // Get the details of the board lists
      const boardLists = await page.$$eval(
        'ul.board-list-wrap > li',
        (elements) => {
          return elements.map((element) => {
            const category =
              element
                .querySelector('.c-board-list-category')
                ?.textContent?.trim() || '';
            const title = element.querySelector('a')?.textContent?.trim() || '';
            // prefix the link with the base URL (https://www.skku.edu/skku/campus/skk_comm/notice01.do)
            const link =
              'https://www.skku.edu/skku/campus/skk_comm/notice01.do' +
                element.querySelector('a')?.getAttribute('href') || '';

            return { category, title, link };
          });
        },
      );

      console.log('Board Lists:', boardLists);
      return boardLists;
    } catch (error) {
      console.error('Error while scraping board lists:', error);
    } finally {
      await browser.close();
    }
  }
}
