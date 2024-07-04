import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsolidationModule } from './consolidation/consolidation.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env'] }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    ConsolidationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
