import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotionModule } from '../notion/notion.module';
import { Spending } from './spending.entity';
import { SpendingsController } from './spendings.controller';
import { SpendingsService } from './spendings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Spending]), HttpModule, NotionModule],
  controllers: [SpendingsController],
  providers: [SpendingsService],
  exports: [SpendingsService],
})
export class SpendingsModule {}
