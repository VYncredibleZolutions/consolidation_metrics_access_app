import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UserLogsConsolidationUseCase } from 'src/@core/use-case/user/user.use-case';

const logger = new Logger();

@Injectable()
export class ConsolidationService {
    constructor(
        private _userLogsConsolidationUseCase: UserLogsConsolidationUseCase
    ) { }

    @Cron('0 */6 * * *', {
        name: 'dailyTask',
        timeZone: 'America/Sao_Paulo',
    })
    async automaticRoutine() {
        try {
            logger.debug('Runnig Routine');
            await this._userLogsConsolidationUseCase.execute();
            logger.debug('Finished Routine');
        } catch (err) {
            logger.error(err.stack);
        }
    }

    async runRoutine(body) {
        try {
            logger.debug('Runnig Routine');
            this._userLogsConsolidationUseCase.execute(body);
            logger.debug('Finished Routine');
            return 'Run Routine';
        } catch (err) {
            logger.error(err);
        }
    }
}
