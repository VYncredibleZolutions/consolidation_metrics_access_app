import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricsSchema } from 'src/@core/schema/metrics.schema';
import { UserLogsSchema } from 'src/@core/schema/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env'] }),
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      host: process.env.DB_POSTGRES_HOST,
      username: process.env.DB_POSTGRES_USER,
      password: process.env.DB_POSTGRES_PASS,
      database: process.env.DB_POSTGRES_DATABASE,
      entities: [
        UserLogsSchema,
        MetricsSchema
      ],
      // ssl: true,
      // synchronize: true,
    }),
  ],
})
export class DatabaseModule { }
