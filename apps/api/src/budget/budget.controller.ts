import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { RecurringPayment } from './recurring-payment.entity';

@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Get('recurring')
  findAll() {
    return this.budgetService.findAll();
  }

  @Get('summary')
  getSummary() {
    return this.budgetService.getSummary();
  }

  @Post('recurring')
  create(@Body() data: Partial<RecurringPayment>) {
    return this.budgetService.create(data);
  }

  @Delete('recurring/:id')
  delete(@Param('id') id: string) {
    return this.budgetService.delete(+id);
  }
}
