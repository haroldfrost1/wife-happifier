import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SpendingsService } from '../spendings/spendings.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const spendingsService = app.get(SpendingsService);

  const dummyTransaction = {
    id: 'test-transaction-id',
    attributes: {
      description: 'Test Transaction from Script',
      amount: { value: '123.45' },
      createdAt: new Date().toISOString(),
    },
    relationships: {
      category: {
        data: { id: 'test-category' },
      },
    },
  };

  console.log('Sending test transaction to Notion...');
  await spendingsService.syncTransactionToNotion(dummyTransaction, 123.45);
  console.log('Done.');

  await app.close();
}

bootstrap();
