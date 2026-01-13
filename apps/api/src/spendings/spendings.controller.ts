import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PaginatedResult } from '@wife-happifier/shared';
import { SpendingsService } from './spendings.service';
import { Spending } from './spending.entity';

@Controller('spendings')
export class SpendingsController {
    constructor(private readonly spendingsService: SpendingsService) { }

    @Get()
    findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<PaginatedResult<Spending>> {
        return this.spendingsService.findAll(Number(page), Number(limit));
    }

    @Post()
    create(@Body() spending: Partial<Spending>): Promise<Spending> {
        return this.spendingsService.create(spending);
    }
}
