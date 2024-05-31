import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenAIService {
  readonly openAI: OpenAI;
  constructor(private configService: ConfigService) {
    this.openAI = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });
  }
}
