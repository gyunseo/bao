import { Injectable } from '@nestjs/common';
import { CreateGangsanDto } from './dto/create-gangsan.dto';
import { OpenAI } from 'openai';
import { ConfigService } from '@nestjs/config';
import { OpenAIService } from 'src/open-ai/open-ai.service';

@Injectable()
export class GangsanService {
  private assistant: OpenAI.Beta.Assistant;
  constructor(
    private configService: ConfigService,
    private openAIService: OpenAIService,
  ) {
    (async () => {
      // ... All async code here
      this.assistant = await this.openAIService.openAI.beta.assistants.retrieve(
        this.configService.get('GANGSAN_ASST_ID'),
      );
    })();
  }
  async chat(createGangsanDto: CreateGangsanDto) {
    return 'This action adds a new gangsan';
  }
}
