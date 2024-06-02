import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { ConfigService } from '@nestjs/config';
import { OpenAIService } from 'src/open-ai/open-ai.service';
import { CreateChatDto } from './dto/create-gangsan.dto';

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
  async createChat(createChatDto: CreateChatDto) {
    // create message

    await this.openAIService.openAI.beta.threads.messages.create(
      'thread_uxrr8s6QGtHF8ykBeipumDAn',
      {
        role: 'user',
        content: createChatDto.msg,
      },
    );
    // Run the assistant
    const runId = (
      await this.openAIService.openAI.beta.threads.runs.create(
        'thread_uxrr8s6QGtHF8ykBeipumDAn',
        {
          assistant_id: this.assistant.id,
          instructions: `address the user as ${createChatDto.name}`,
        },
      )
    ).id;
    await this.openAIService.openAI.beta.threads.runs.retrieve(
      'thread_uxrr8s6QGtHF8ykBeipumDAn',
      runId,
    );
    const messages = await this.openAIService.openAI.beta.threads.messages.list(
      'thread_uxrr8s6QGtHF8ykBeipumDAn',
    );

    messages.data.forEach((message) => {
      console.log(message.content);
    });

    const logs = await this.openAIService.openAI.beta.threads.runs.steps.list(
      'thread_uxrr8s6QGtHF8ykBeipumDAn',
      runId,
    );
    logs.data.forEach((log) => {
      console.log(log.step_details);
    });
  }
}
