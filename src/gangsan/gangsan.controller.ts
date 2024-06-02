import { Body, Controller, Post } from '@nestjs/common';
import { GangsanService } from './gangsan.service';
import { CreateChatDto } from './dto/create-gangsan.dto';

@Controller('gangsan')
export class GangsanController {
  constructor(private readonly gangsanService: GangsanService) {}

  @Post()
  async post(@Body() createChatDto: CreateChatDto) {
    return await this.gangsanService.createChat(createChatDto);
  }
}
