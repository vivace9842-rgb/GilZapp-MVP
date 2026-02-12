import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USER || 'gilzapp',
  password: process.env.DATABASE_PASSWORD || 'gilzapp_secret_2024',
  database: process.env.DATABASE_NAME || 'gilzapp_dev',
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*.js'],
  migrationsTableName: 'migrations_typeorm',
}));
