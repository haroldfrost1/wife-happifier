import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { SpendingsService } from '../src/spendings/spendings.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const spendingsService = app.get(SpendingsService);

  console.log('Manually triggering syncUpBankTransactions...');
  try {
    await spendingsService.syncUpBankTransactions();
    console.log('Sync executed successfully.');
  } catch (e) {
    console.error('Sync failed:', e);
  }

  await app.close();
}
bootstrap();
