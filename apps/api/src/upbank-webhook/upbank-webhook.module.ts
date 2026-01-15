import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UpBankWebhookController } from './upbank-webhook.controller';
import { UpBankWebhookService } from './upbank-webhook.service';

@Module({
  imports: [ConfigModule],
  controllers: [UpBankWebhookController],
  providers: [UpBankWebhookService],
  exports: [UpBankWebhookService],
})
export class UpBankWebhookModule {}
