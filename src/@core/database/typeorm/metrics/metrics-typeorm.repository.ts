import { MetricsSchema } from "src/@core/schema/metrics.schema";
import { Repository } from "typeorm";

export class MetricsTypeOrmRepository {
    constructor(private ormRepo: Repository<MetricsSchema>) { }

    async insert(log): Promise<any> {
        return await this.ormRepo.save(log);
    }

    async updateById(metrics_internal_id, log): Promise<any> {
        return await this.ormRepo.update({ metrics_internal_id }, log);
    }


    async findByDate(day, month, year) {
        return await this.ormRepo.findOneBy({
            metrics_day: day,
            metrics_month: month,
            metrics_year: year
        })
    }

    async findAllByDate(start_date, end_date) {
        const newQuery = this.ormRepo.createQueryBuilder('mt').select()

        if (start_date && end_date) {
            newQuery.andWhere("mt.metrics_date_sessions_created BETWEEN :startDate AND :endDate", {
                startDate: start_date,
                endDate: end_date,
            })
        }
        return await newQuery.getRawMany();
    }

}