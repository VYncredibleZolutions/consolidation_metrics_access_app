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

}