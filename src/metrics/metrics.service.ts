import { Injectable, Logger } from '@nestjs/common';
import { MetricsTypeOrmRepository } from 'src/@core/database/typeorm/metrics/metrics-typeorm.repository';
import { MetricsGetListBodyDto } from './dto/metrics.dto';

const logger = new Logger('Metrics Service');

@Injectable()
export class MetricsService {

    constructor(private _metricsTypeOrmRepository: MetricsTypeOrmRepository) { }

    async getList(body: MetricsGetListBodyDto) {
        try {
            const start_date = body?.start_date ? new Date(body?.start_date) : ''
            const end_date = body?.end_date ? new Date(body?.end_date) : ''
            if (start_date && end_date) {
                end_date.setDate(end_date.getDate() + 1)
                end_date.setMilliseconds(end_date.getMilliseconds() - 1)
            }
            const response = await this._metricsTypeOrmRepository.findAllByDate(start_date, end_date);

            return {
                success: true,
                message: response
            }
        } catch (err) {
            logger.error(err.stack);
            return {
                success: false,
                message: err.stack
            }
        }
    }

}
