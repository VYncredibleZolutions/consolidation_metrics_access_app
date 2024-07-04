import { Body, Controller, Post } from '@nestjs/common';
import { ConsolidationService } from './consolidation.service';

@Controller('consolidation')
export class ConsolidationController {
    constructor(private _consolidationService: ConsolidationService) { }

    @Post('routine')
    async runRoutine(@Body() body) {
        return await this._consolidationService.runRoutine(body);
    }
}
