import { Module } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { MetricsTypeOrmRepository } from 'src/@core/database/typeorm/metrics/metrics-typeorm.repository';
import { MetricsSchema } from 'src/@core/schema/metrics.schema';
import { DataSource } from 'typeorm';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';

@Module({
  providers: [
    MetricsService,
    {
      provide: MetricsTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new MetricsTypeOrmRepository(
          dataSource.getRepository(MetricsSchema),
        );
      },
      inject: [getDataSourceToken()],
    },
  ],
  controllers: [MetricsController]
})
export class MetricsModule { }
