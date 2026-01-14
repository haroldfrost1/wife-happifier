import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spending } from './spending.entity';
import { SpendingsController } from './spendings.controller';
import { SpendingsService } from './spendings.service';

@Module({
    imports: [TypeOrmModule.forFeature([Spending]), HttpModule],
    controllers: [SpendingsController],
    providers: [SpendingsService],
    exports: [SpendingsService],
})
export class SpendingsModule { }
