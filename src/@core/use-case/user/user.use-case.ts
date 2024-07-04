import { Logger } from "@nestjs/common";
import { MetricsTypeOrmRepository } from "src/@core/database/typeorm/metrics/metrics-typeorm.repository";
import { UserTypeOrmRepository } from "src/@core/database/typeorm/user/user-typeorm.repository";
import { Metrics } from "src/@core/entities/metrics/metrics.entity";
import { UserLogsSchema } from "src/@core/schema/user.schema";

const logger = new Logger('User Logs Use Case Consolidation')

interface DistinctLogsDto {
    metrics_day: number;
    metrics_month: string;
    metrics_year: number;
    metrics_count_access: number;
}


export class UserLogsConsolidationUseCase {
    constructor(
        private _userTypeOrmRepository: UserTypeOrmRepository,
        private _metricsTypeOrmRepository: MetricsTypeOrmRepository,
    ) { }

    async execute(body?: any) {
        try {

            let currentDate: Date;
            let startDate: Date;
            if (body) {
                currentDate = new Date(body.end_date)
                startDate = new Date(body.start_date)
            } else {
                currentDate = new Date();
                startDate = new Date();
                startDate.setDate(startDate.getDate() - 1); // Remove um dia a partir do dia "currentDate"
            }


            logger.verbose(`Start Date - ${startDate.toISOString()}`)
            logger.verbose(`End Date - ${currentDate.toISOString()}`)

            const findDistinctUsers = await this._userTypeOrmRepository.getDistinctUsersByDate(startDate, currentDate);

            const getByDate: DistinctLogsDto[] = findDistinctUsers.map((log: UserLogsSchema): DistinctLogsDto => {
                const startDateLog: Date = log['user_createdat'];

                const getNameMonth = startDateLog?.toLocaleString('pt-BR', { month: 'long' });
                return {
                    metrics_day: startDateLog.getDate(),
                    metrics_month: getNameMonth,
                    metrics_year: startDateLog.getFullYear(),
                    metrics_count_access: 0,
                }
            });

            let listDistinctLogsDays: DistinctLogsDto[] = [];
            getByDate.forEach((log) => {
                const findIndexLog = listDistinctLogsDays.findIndex((x) =>
                    x?.metrics_day === log?.metrics_day
                    && x?.metrics_month === log.metrics_month
                    && x?.metrics_year === log.metrics_year
                );
                if (findIndexLog !== -1) {
                    listDistinctLogsDays[findIndexLog].metrics_count_access += 1;
                } else {
                    listDistinctLogsDays.push({
                        ...log,
                        metrics_count_access: 1
                    })
                }
            });

            let countsaved = 0;
            for (const log of listDistinctLogsDays) {
                try {
                    const {
                        metrics_day,
                        metrics_month,
                        metrics_year
                    } = log;

                    const findMetrics = await this._metricsTypeOrmRepository.findByDate(metrics_day, metrics_month.toUpperCase(), metrics_year);
                    if (findMetrics) {
                        const updateMetric = Metrics.update({
                            ...findMetrics,
                            ...log
                        },
                            findMetrics.metrics_internal_id
                        );
                        await this._metricsTypeOrmRepository.updateById(findMetrics.metrics_internal_id, updateMetric.props);
                    } else {
                        const newMetric = Metrics.create(log);
                        await this._metricsTypeOrmRepository.insert(newMetric);
                    }
                    countsaved++;
                    logger.log(`Saved log - ${countsaved} / ${listDistinctLogsDays.length}`)
                } catch (err) {
                    logger.error(`Error to save: ${err.stack}`)
                }
            }

            return {
                success: true,
                message: 'Metrics session created successfully'
            }
        } catch (err) {
            logger.error(err.stack)
            return {
                success: false,
                message: err.stack
            }
        }
    }
}