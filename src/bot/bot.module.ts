import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { OpenAIService } from 'src/open-ai/open-ai.service';
import { ScrapperService } from 'src/scrapper/scrapper.service';

@Module({
  controllers: [BotController],
  providers: [BotService, OpenAIService, ScrapperService],
})
export class BotModule {}
