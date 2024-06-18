import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { OpenAI } from 'openai';
import { ConfigService } from '@nestjs/config';
import { OpenAIService } from 'src/open-ai/open-ai.service';
import { CreateChatDto } from './dto/create-gangsan.dto';
import { ScrapperService } from 'src/scrapper/scrapper.service';
import * as Bull from 'bull';
@Injectable()
export class GangsanService implements OnModuleDestroy {
  private assistant: OpenAI.Beta.Assistant;
  private queue: Bull.Queue;

  constructor(
    private configService: ConfigService,
    private openAIService: OpenAIService,
    private scrapperService: ScrapperService,
  ) {
    (async () => {
      // ... All async code here
      this.assistant = await this.openAIService.openAI.beta.assistants.retrieve(
        this.configService.get('GANGSAN_ASST_ID'),
      );
    })();
    const redisOptions = {
      host: this.configService.get('REDIS_HOST'), // Redis 서버 주소
      port: this.configService.get('REDIS_PORT'), // Redis 서버 포트
    };

    this.queue = new Bull('task-queue', {
      redis: redisOptions,
    });

    this.queue.process(this.processTask.bind(this));
  }
  async onModuleDestroy() {
    await this.queue.close();
  }
  async createChat(createChatDto: CreateChatDto): Promise<any> {
    return new Promise((resolve, reject) => {
      this.queue
        .add({ createChatDto })
        .then((job) => {
          job
            .finished()
            .then((result) => {
              resolve(result);
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  private async processTask(job: Bull.Job) {
    const { createChatDto } = job.data;

    try {
      if (createChatDto.msg.includes('공지사항')) {
        const boardLists = await this.scrapperService.scrapeBoardLists();
        // 1. [카테고리]제목, 링크 형태로 반환
        return {
          msg: boardLists
            .map(
              (board, idx) =>
                `${idx + 1}. ${board.category}${board.title}, ${board.link}`,
            )
            .join('\n\n'),
        };
      }

      // create message
      await this.openAIService.openAI.beta.threads.messages.create(
        this.configService.get('THREAD_ID'),
        {
          role: 'user',
          content: createChatDto.msg,
        },
      );

      // Run the assistant
      const run =
        await this.openAIService.openAI.beta.threads.runs.createAndPoll(
          this.configService.get('THREAD_ID'),
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
        return {
          msg: `${createChatDto.name}님 안녕하세요! ${this.extractMessageContent(
            messages.data[messages.data.length - 1].content,
          )}`,
        };
      } else {
        console.log(run.status);
        throw new Error('Run not completed');
      }
    } catch (error) {
      throw error;
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
