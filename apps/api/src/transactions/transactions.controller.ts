import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Query,
} from '@nestjs/common';
import { PaginatedResult } from '@wife-happifier/shared';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<PaginatedResult<Transaction>> {
    return this.transactionsService.findAll(Number(page), Number(limit));
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('bankId') bankId: string = 'default',
  ) {
    if (!file) {
      throw new Error('No file uploaded');
    }
    return this.transactionsService.import(file.buffer, bankId);
  }

  @Get('monthly-report')
  getMonthlyReport() {
    return this.transactionsService.getMonthlyReport();
  }

  @Get('category-breakdown')
  getCategoryBreakdown(@Query('month') month: string) {
    return this.transactionsService.getCategoryBreakdown(month);
  }
}
