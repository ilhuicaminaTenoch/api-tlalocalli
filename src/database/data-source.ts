import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const DatabaseDataSource = new DataSource({
  type: 'mysql',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: true,
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/database/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'migrations',
});
