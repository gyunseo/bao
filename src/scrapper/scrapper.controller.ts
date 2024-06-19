import { Controller, Get, Query } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';

@Controller('scrapper')
export class ScrapperController {
  constructor(private readonly scrapperService: ScrapperService) {}

  @Get('/board-lists')
  async getBoardLists() {
    return await this.scrapperService.scrapeBoardLists();
  }
  @Get('/weather')
  async getWeather(@Query('location') location: string) {
    return await this.scrapperService.scrapeWeather(location);
  }
}
