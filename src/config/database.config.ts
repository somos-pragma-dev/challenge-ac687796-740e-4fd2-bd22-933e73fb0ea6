import { DataSource, DataSourceOptions } from 'typeorm';
import { LoanRequest } from '../loan-requests/entities/loan-request.entity';

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'loan_requests_db',
  entities: [LoanRequest],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
  extra: {
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '20', 10),
    acquireTimeout: parseInt(process.env.DB_ACQUIRE_TIMEOUT || '30000', 10),
    idleTimeout: parseInt(process.env.DB_IDLE_TIMEOUT || '30000', 10),
  },
  pool: {
    min: parseInt(process.env.DB_POOL_MIN || '2', 10),
    max: parseInt(process.env.DB_POOL_MAX || '20', 10),
    acquireTimeoutMillis: parseInt(process.env.DB_ACQUIRE_TIMEOUT || '30000', 10),
    idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || '30000', 10),
  },
};

export const AppDataSource = new DataSource(databaseConfig);

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (): Promise<DataSource> => {
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }
      return AppDataSource;
    },
  },
];