import { Module } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { MetricsTypeOrmRepository } from 'src/@core/database/typeorm/metrics/metrics-typeorm.repository';
import { UserTypeOrmRepository } from 'src/@core/database/typeorm/user/user-typeorm.repository';
import { MetricsSchema } from 'src/@core/schema/metrics.schema';
import { UserLogsSchema } from 'src/@core/schema/user.schema';
import { UserLogsConsolidationUseCase } from 'src/@core/use-case/user/user.use-case';
import { DataSource } from 'typeorm';
import { ConsolidationController } from './consolidation.controller';
import { ConsolidationService } from './consolidation.service';

@Module({
  providers: [
    ConsolidationService,
    {
      provide: UserTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new UserTypeOrmRepository(
          dataSource.getRepository(UserLogsSchema),
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: MetricsTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new MetricsTypeOrmRepository(
          dataSource.getRepository(MetricsSchema),
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: UserLogsConsolidationUseCase,
      useFactory: (
        UserTypeOrmRepository: UserTypeOrmRepository,
        MetricsTypeOrmRepository: MetricsTypeOrmRepository
      ) => {
        return new UserLogsConsolidationUseCase(
          UserTypeOrmRepository,
          MetricsTypeOrmRepository
        )
      },
      inject: [
        UserTypeOrmRepository,
        MetricsTypeOrmRepository
      ]
    }
  ],
  controllers: [ConsolidationController]
})
export class ConsolidationModule { }
