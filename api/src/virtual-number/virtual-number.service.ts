import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VirtualNumber } from '../entities/virtual-number.entity';

@Injectable()
export class VirtualNumberService {
  constructor(
    @InjectRepository(VirtualNumber)
    private virtualNumberRepository: Repository<VirtualNumber>,
  ) {}

  async findAll(): Promise<VirtualNumber[]> {
    return this.virtualNumberRepository.find({ relations: ['owner'] });
  }

  async findOne(id: string): Promise<VirtualNumber> {
    const virtualNumber = await this.virtualNumberRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (!virtualNumber) {
      throw new NotFoundException('Virtual Number not found');
    }
    return virtualNumber;
  }

  async create(virtualNumberData: Partial<VirtualNumber>): Promise<VirtualNumber> {
    const virtualNumber = this.virtualNumberRepository.create(virtualNumberData);
    return this.virtualNumberRepository.save(virtualNumber);
  }

  async update(id: string, virtualNumberData: Partial<VirtualNumber>): Promise<VirtualNumber> {
    await this.virtualNumberRepository.update(id, virtualNumberData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.virtualNumberRepository.delete(id);
  }
}
