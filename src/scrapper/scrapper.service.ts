import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ScrapperService {
  private browser: puppeteer.Browser;
  constructor() {
    // Initialize the puppeteer browser
    (async () => {
      // ... All async code here
      this.browser = await puppeteer.launch();
    })();
  }
  async scrapeBoardLists() {
    const page = await this.browser.newPage();

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
      return {
        msg: boardLists
          .map(
            (board, idx) =>
              `${idx + 1}. ${board.category}${board.title}, ${board.link}`,
          )
          .join('\n\n'),
      };
    } catch (error) {
      console.error('Error while scraping board lists:', error);
    }
  }

  async scrapeWeather(location: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log('Scraping weather for:', location);
    try {
      const query = encodeURIComponent(`날씨+${location}`);
      const url = `https://m.search.naver.com/search.naver?&query=${query}`;
      console.log('Scraping weather from:', url);
      await page.goto(url);

      const weatherData = await page.evaluate(() => {
        const weatherInfo = document.querySelector('.weather_info');
        if (!weatherInfo) {
          throw new Error('Weather info not found');
        }

        const today = weatherInfo.querySelector('._today');
        if (!today) {
          throw new Error('Today weather info not found');
        }

        // 현재 온도
        const curTemp =
          today
            .querySelector('.temperature_text strong')
            ?.textContent?.slice(5) || 'N/A';
        // 어제와 온도차이
        const diffTemp =
          weatherInfo.querySelector('.temperature_info .temperature')
            ?.textContent || 'N/A';
        const diffStat =
          weatherInfo.querySelector('.temperature_info .blind')?.textContent ||
          'N/A';

        // 체감
        const feelTemp =
          today.querySelectorAll('.summary_list .sort .desc')[0]?.textContent ||
          'N/A';
        // 습도
        const humidity =
          today.querySelectorAll('.summary_list .sort .desc')[1]?.textContent ||
          'N/A';
        // 풍속
        const windSpeed =
          today.querySelectorAll('.summary_list .sort .desc')[2]?.textContent ||
          'N/A';

        return {
          curTemp,
          diffTemp,
          diffStat,
          feelTemp,
          humidity,
          windSpeed,
        };
      });

      console.log(`Weather in ${location}:`, weatherData);
      return {
        msg: `현재 ${location} 날씨는 ${weatherData.curTemp}이며, 어제보다 ${weatherData.diffTemp.replace('높아요', '')}${weatherData.diffStat}\n체감 온도는 ${weatherData.feelTemp}, 습도는 ${weatherData.humidity}, 풍속은 ${weatherData.windSpeed}에요!`,
      };
    } catch (error) {
      console.error('Error while scraping weather:', error);
    }
  }
}
