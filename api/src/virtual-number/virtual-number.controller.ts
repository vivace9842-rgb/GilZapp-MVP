import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { VirtualNumberService } from './virtual-number.service';
import { VirtualNumber } from '../entities/virtual-number.entity';

@Controller('virtual-numbers')
export class VirtualNumberController {
  constructor(private readonly virtualNumberService: VirtualNumberService) {}

  @Get()
  findAll(): Promise<VirtualNumber[]> {
    return this.virtualNumberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<VirtualNumber> {
    return this.virtualNumberService.findOne(id);
  }

  @Post()
  create(@Body() virtualNumberData: Partial<VirtualNumber>): Promise<VirtualNumber> {
    return this.virtualNumberService.create(virtualNumberData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() virtualNumberData: Partial<VirtualNumber>): Promise<VirtualNumber> {
    return this.virtualNumberService.update(id, virtualNumberData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.virtualNumberService.remove(id);
  }
}
