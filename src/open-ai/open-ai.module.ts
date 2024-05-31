import { Module } from '@nestjs/common';
import { OpenAIService } from './open-ai.service';
@Module({ exports: [OpenAIService] })
export class OpenAIModule {}
