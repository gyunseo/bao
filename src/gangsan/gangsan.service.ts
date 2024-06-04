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
    const run = await this.openAIService.openAI.beta.threads.runs.createAndPoll(
      'thread_uxrr8s6QGtHF8ykBeipumDAn',
      {
        assistant_id: this.assistant.id,
        instructions: `address the user as ${createChatDto.name}`,
      },
    );
    if (run.status === 'completed') {
      const messages =
        await this.openAIService.openAI.beta.threads.messages.list(
          run.thread_id,
        );
      for (const message of messages.data.reverse()) {
        console.log(
          `${message.role} > ${this.extractMessageContent(message.content)}`,
        );
      }
      return `${createChatDto.name}님 안녕하세요! this.extractMessageContent(
        messages.data[messages.data.length - 1].content,
      )`;
    } else {
      console.log(run.status);
    }
  }
  private extractMessageContent(content: any): string {
    return content
      .map((block) => {
        if (block.type === 'text' && block.text) {
          return block.text.value;
        }
        // Add other content block type handlers if needed
        return '';
      })
      .join(' ');
  }
}
