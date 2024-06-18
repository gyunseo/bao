import { Module } from '@nestjs/common';
import { GangsanService } from './gangsan.service';
import { GangsanController } from './gangsan.controller';
import { OpenAIService } from 'src/open-ai/open-ai.service';
import { ScrapperService } from 'src/scrapper/scrapper.service';

@Module({
  controllers: [GangsanController],
  providers: [GangsanService, OpenAIService, ScrapperService],
})
export class GangsanModule {}
