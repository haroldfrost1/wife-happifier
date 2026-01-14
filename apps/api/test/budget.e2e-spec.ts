import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PaymentFrequency, PaymentType } from '@wife-happifier/shared';

describe('BudgetController (e2e)', () => {
  let app: INestApplication<App>;
  let createdId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/budget/recurring (POST) - Create payment', async () => {
    const response = await request(app.getHttpServer())
      .post('/budget/recurring')
      .send({
        name: 'Test Rent',
        amount: 2500,
        frequency: PaymentFrequency.MONTHLY,
        startDate: '2024-01-01',
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Test Rent');
    createdId = response.body.id;
  });

  it('/budget/recurring (POST) - Create Quarterly payment', async () => {
    const response = await request(app.getHttpServer())
      .post('/budget/recurring')
      .send({
        name: 'Quarterly Bill',
        amount: 600,
        frequency: PaymentFrequency.QUARTERLY,
        startDate: '2024-01-01',
      })
      .expect(201);
    expect(response.body.frequency).toBe(PaymentFrequency.QUARTERLY);
    // Cleanup
    await request(app.getHttpServer()).delete(
      `/budget/recurring/${response.body.id}`,
    );
  });

  it('/budget/recurring (POST) - Create Once-off payment', async () => {
    const response = await request(app.getHttpServer())
      .post('/budget/recurring')
      .send({
        name: 'Once Off Bill',
        amount: 1000,
        frequency: PaymentFrequency.ONCE_OFF,
        startDate: '2025-01-01',
      })
      .expect(201);
    expect(response.body.frequency).toBe(PaymentFrequency.ONCE_OFF);
    // Cleanup
    await request(app.getHttpServer()).delete(
      `/budget/recurring/${response.body.id}`,
    );
  });

  it('/budget/recurring (POST) - Create Income payment', async () => {
    const response = await request(app.getHttpServer())
      .post('/budget/recurring')
      .send({
        name: 'Job Salary',
        amount: 5000,
        frequency: PaymentFrequency.MONTHLY,
        type: PaymentType.INCOME,
        startDate: '2024-01-01',
      })
      .expect(201);
    expect(response.body.type).toBe(PaymentType.INCOME);
    // Cleanup
    await request(app.getHttpServer()).delete(
      `/budget/recurring/${response.body.id}`,
    );
  });

  it('/budget/recurring (GET) - List payments', async () => {
    const response = await request(app.getHttpServer())
      .get('/budget/recurring')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    const item = response.body.find((p: any) => p.id === createdId);
    expect(item).toBeDefined();
    expect(item.name).toBe('Test Rent');
  });

  it('/budget/recurring/:id (DELETE) - Delete payment', async () => {
    await request(app.getHttpServer())
      .delete(`/budget/recurring/${createdId}`)
      .expect(200);

    const response = await request(app.getHttpServer())
      .get('/budget/recurring')
      .expect(200);

    const item = response.body.find((p: any) => p.id === createdId);
    expect(item).toBeUndefined();
  });

  it('/budget/summary (GET) - Get spending summary', async () => {
    const response = await request(app.getHttpServer())
      .get('/budget/summary')
      .expect(200);

    expect(response.body).toHaveProperty('mtdSpending');
    expect(response.body).toHaveProperty('ytdSpending');
    // We can't easily assert values without mocking, but we can check structure
    expect(typeof response.body.mtdSpending).toBe('number');
    expect(typeof response.body.ytdSpending).toBe('number');
  });
});
