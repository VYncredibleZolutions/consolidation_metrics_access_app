import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MetricsService } from './metrics.service';

@Controller('metrics')
@UseGuards(AuthGuard('basic'))
export class MetricsController {
    constructor(private _metricsService: MetricsService) { }

    async findAllMetrics() {

    }
}
