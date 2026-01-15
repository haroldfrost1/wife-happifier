import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { SpendingsModule } from '../spendings/spendings.module';
import { UpBankWebhookController } from './upbank-webhook.controller';
import { UpBankWebhookService } from './upbank-webhook.service';

@Module({
  imports: [ConfigModule, HttpModule, SpendingsModule],
  controllers: [UpBankWebhookController],
  providers: [UpBankWebhookService],
  exports: [UpBankWebhookService],
})
export class UpBankWebhookModule {}
