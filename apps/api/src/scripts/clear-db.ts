import { AppDataSource } from '../data-source';

async function clearDatabase() {
  console.log('Initializing data source...');
  try {
    await AppDataSource.initialize();
  } catch (error) {
    console.error('Error initializing data source:', error);
    process.exit(1);
  }

  try {
    // We don't strictly need to connect queryRunner if we use the dataSource manager,
    // but queryRunner allows raw query execution more explicitly.
    // AppDataSource.manager.query(...) works too.

    console.log('Clearing database...');
    const entities = AppDataSource.entityMetadatas;

    // Disable foreign key checks temporarily if needed, but CASCADE usually handles it.
    // However, simply truncating in any order with CASCADE is robust for Postgres.

    for (const entity of entities) {
      const tableName = entity.tableName;
      if (tableName === 'migrations') continue; // Should not happen if not in entities, but safety check.

      console.log(`Clearing table "${tableName}"...`);
      await AppDataSource.query(`TRUNCATE TABLE "${tableName}" CASCADE;`);
    }

    console.log('Database cleared successfully.');
  } catch (error) {
    console.error('Error clearing database:', error);
    process.exit(1);
  } finally {
    await AppDataSource.destroy();
  }
}

void clearDatabase();
