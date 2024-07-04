import { Body, Controller, HttpStatus, Logger, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MetricsGetListBodyDto } from './dto/metrics.dto';
import { MetricsService } from './metrics.service';

const logger = new Logger('Metrics Controller');

@Controller('metrics')
@UseGuards(AuthGuard('basic'))
export class MetricsController {
    constructor(private _metricsService: MetricsService) { }

    @Post('list')
    async getMetrics(@Res() res, @Body() body: MetricsGetListBodyDto) {
        logger.debug('Get List Metrics')

        const response = await this._metricsService.getList(body);

        if (!response.success) return res.status(HttpStatus.BAD_REQUEST).json(response.message);

        res.status(HttpStatus.OK)
        res.send(response.message)
    }
}
