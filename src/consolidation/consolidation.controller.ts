import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConsolidationService } from './consolidation.service';

@Controller('consolidation')
@UseGuards(AuthGuard('basic'))
export class ConsolidationController {
    constructor(private _consolidationService: ConsolidationService) { }

    @Post('routine')
    async runRoutine(@Body() body) {
        return await this._consolidationService.runRoutine(body);
    }
}
