import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilterRule } from './filter-rule.entity';

@Controller('filter-rules')
export class FilterRulesController {
  constructor(
    @InjectRepository(FilterRule)
    private filterRulesRepository: Repository<FilterRule>,
  ) {}

  @Get()
  findAll(): Promise<FilterRule[]> {
    return this.filterRulesRepository.find({ order: { createdAt: 'DESC' } });
  }

  @Post()
  create(@Body() rule: Partial<FilterRule>): Promise<FilterRule> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = rule;
    const newRule = this.filterRulesRepository.create(rest);
    return this.filterRulesRepository.save(newRule);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.filterRulesRepository.delete(id);
  }
}
