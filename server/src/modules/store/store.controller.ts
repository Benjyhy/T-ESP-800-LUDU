import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreDocument } from 'src/schemas/store.schema';
import { StoreDto } from './dto/store.dto';

@Controller('store')
export class StoreController {
  constructor(private storeService: StoreService) {}

  @Get('')
  findAll(): Promise<StoreDocument[]> {
    return this.storeService.findAll();
  }

  @Get('/:id')
  findById(
    @Param('id')
    id: string,
  ): Promise<StoreDocument> {
    return this.storeService.findById(id);
  }

  @Post('')
  create(
    @Body(new ValidationPipe({ transform: true }))
    storeDto: StoreDto,
  ): Promise<StoreDocument> {
    return this.storeService.create(storeDto);
  }
}
