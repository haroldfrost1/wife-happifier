import { DataSource } from 'typeorm';
// ESM workarounds if needed, or just strict paths.
// Since NestJS + ts-node can be tricky with ESM, let's try direct relative path with process.cwd() or just string.
import { join } from 'path';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5532', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'wife-happifier',
  synchronize: false, // Always false for migrations
  logging: true,
  entities: [join(process.cwd(), 'src/**/*.entity{.ts,.js}')],
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'migrations',
});
