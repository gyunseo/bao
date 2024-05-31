import { Controller, Post, Body } from '@nestjs/common';
import { GangsanService } from './gangsan.service';
import { CreateGangsanDto } from './dto/create-gangsan.dto';

@Controller('gangsan')
export class GangsanController {
  constructor(private readonly gangsanService: GangsanService) {}

  @Post()
  async create(@Body() createGangsanDto: CreateGangsanDto) {
    return this.gangsanService.chat(createGangsanDto);
  }
}
