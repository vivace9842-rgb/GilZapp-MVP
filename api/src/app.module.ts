import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import { User } from './entities/user.entity';
import { VirtualNumber } from './entities/virtual-number.entity';
import { UserModule } from './user/user.module';
import { VirtualNumberModule } from './virtual-number/virtual-number.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get('database');
        return {
          type: 'postgres',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,
          synchronize: dbConfig.synchronize,
          logging: dbConfig.logging,
          entities: [User, VirtualNumber],
        };
      },
    }),
    UserModule,
    VirtualNumberModule,
  ],
})
export class AppModule {}
