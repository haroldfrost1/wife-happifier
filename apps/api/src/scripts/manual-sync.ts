
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SpendingsService } from '../spendings/spendings.service';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const spendingsService = app.get(SpendingsService);

    console.log('Triggering manual sync of Up Bank transactions...');
    await spendingsService.syncUpBankTransactions();
    console.log('Manual sync completed.');

    await app.close();
}

bootstrap();
