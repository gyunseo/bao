import { PartialType } from '@nestjs/mapped-types';
import { CreateGangsanDto } from './create-gangsan.dto';

export class UpdateGangsanDto extends PartialType(CreateGangsanDto) {}
