import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VirtualNumberController } from './virtual-number.controller';
import { VirtualNumberService } from './virtual-number.service';
import { VirtualNumber } from '../entities/virtual-number.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VirtualNumber])],
  controllers: [VirtualNumberController],
  providers: [VirtualNumberService],
  exports: [VirtualNumberService],
})
export class VirtualNumberModule {}
