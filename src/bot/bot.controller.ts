import { Body, Controller, Post } from '@nestjs/common';
import { BotService } from './bot.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Post()
  async post(@Body() createChatDto: CreateChatDto) {
    return await this.botService.createChat(createChatDto);
  }
}
