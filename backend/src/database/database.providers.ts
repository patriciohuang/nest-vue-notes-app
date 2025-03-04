import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'sqlite',
        database: process.env.DB_DATABASE || './data/mydatabase.sqlite', // Default SQLite file
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true, // Auto-creates tables (for dev only)
      });

      return dataSource.initialize();
    },
  },
];
