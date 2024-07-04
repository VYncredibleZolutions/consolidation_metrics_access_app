import { UserLogsSchema } from "src/@core/schema/user.schema";
import { Repository } from "typeorm";

export class UserTypeOrmRepository {
    constructor(private ormRepo: Repository<UserLogsSchema>) { }

    async getDistinctUsersByDate(start_date: Date, end_date: Date): Promise<UserLogsSchema[]> {
        return await this.ormRepo.createQueryBuilder('user')
            .select([
                'user.user_internal_id AS user_internal_id',
                'user.user_name AS user_name',
                'user.user_whatsapp_number AS user_whatsapp_number',
                'user.user_first_input AS user_first_input',
                'user.user_createdAt AS user_createdAt',
                'user.user_updatedAt AS user_updatedAt'
            ])
            .distinctOn([
                'user.user_whatsapp_number',
                'DATE(user.user_createdAt)'
            ])
            .where("user.user_createdAt BETWEEN :startDate AND :endDate", {
                startDate: start_date,
                endDate: end_date,
            })
            .getRawMany();
    }

    // async findAll(
    //     page?: number,
    //     limit?: number,
    //     sort: 'ASC' | 'DESC' = 'ASC',
    //     filters?: BodyFilterQrCodLogs,
    // ): Promise<UserLogsSchema[]> {

    //     const offset = page ? (page - 1) * limit : undefined;
    //     const limitInQUery = !limit ? undefined : limit;
    //     const pageInQUery = offset <= 0 ? 0 : offset;

    //     const queryBuilder = this.ormRepo.createQueryBuilder('qr').select([
    //         "qr.*"
    //     ]);

    //     if (filters?.start_date || filters?.end_date) {
    //         if (filters?.start_date && filters?.end_date) {
    //             queryBuilder.andWhere("qr.lq_created_at BETWEEN :startDate AND :endDate", {
    //                 startDate: filters?.start_date,
    //                 endDate: filters?.end_date,
    //             })
    //         } else if (filters?.start_date) {
    //             queryBuilder.andWhere("qr.lq_created_at > :startDate", {
    //                 startDate: filters?.start_date,
    //             })
    //         } else {
    //             queryBuilder.andWhere("qr.lq_created_at < :endDate", {
    //                 endDate: filters?.end_date,
    //             })

    //         }
    //     }
    //     if (filters?.lq_id_becaps) {
    //         queryBuilder.andWhere("qr.lq_id_becaps ILIKE :idBecaps", {
    //             idBecaps: `%${filters?.lq_id_becaps}%`,
    //         })
    //     }
    //     if (filters?.lq_whatsapp_number) {
    //         queryBuilder.andWhere("qr.lq_whatsapp_number ILIKE :whatsAppNumber", {
    //             whatsAppNumber: `%${filters?.lq_whatsapp_number}%`,
    //         })
    //     }
    //     if (filters?.lq_whatsapp_name) {
    //         queryBuilder.andWhere("qr.lq_whatsapp_name ILIKE :whatsAppName", {
    //             whatsAppName: `%${filters?.lq_whatsapp_name}%`,
    //         })
    //     }
    //     if (filters?.lq_code_id) {
    //         queryBuilder.andWhere("qr.lq_code_id ILIKE :codeID", {
    //             codeID: `%${filters?.lq_code_id}%`,
    //         })
    //     }
    //     queryBuilder.orderBy("qr.lq_created_at", sort);

    //     // Pagination
    //     if (pageInQUery !== undefined && limitInQUery !== undefined) {
    //         queryBuilder.offset(Number(pageInQUery)).limit(Number(limitInQUery))
    //     }

    //     const response = await queryBuilder.getRawMany()

    //     return response;
    // }

    // async count(filters?: BodyFilterQrCodLogs) {
    //     const queryBuilder = this.ormRepo.createQueryBuilder('qr').select([
    //         "qr.*"
    //     ]);

    //     if (filters?.lq_id_becaps) {
    //         queryBuilder.andWhere("qr.lq_id_becaps ILIKE :idBecaps", {
    //             idBecaps: `%${filters?.lq_id_becaps}%`,
    //         })
    //     }
    //     if (filters?.lq_whatsapp_number) {
    //         queryBuilder.andWhere("qr.lq_whatsapp_number ILIKE :whatsAppNumber", {
    //             whatsAppNumber: `%${filters?.lq_whatsapp_number}%`,
    //         })
    //     }
    //     if (filters?.lq_whatsapp_name) {
    //         queryBuilder.andWhere("qr.lq_whatsapp_name ILIKE :whatsAppName", {
    //             whatsAppName: `%${filters?.lq_whatsapp_name}%`,
    //         })
    //     }
    //     if (filters?.lq_code_id) {
    //         queryBuilder.andWhere("qr.lq_code_id ILIKE :codeID", {
    //             codeID: `%${filters?.lq_code_id}%`,
    //         })
    //     }

    //     const response = await queryBuilder.getCount()

    //     return response;
    // }

    // async findByIdBecaps(idBecaps: string) {
    //     return await this.ormRepo.findOneBy({ lq_id_becaps: idBecaps });
    // }

    // async create(body) {
    //     return await this.ormRepo.save(body);
    // }

    // async updateById(lq_internal_id, body) {
    //     return await this.ormRepo.update({ lq_internal_id }, body);
    // }

    // async getDistinctUsersByDate(start_date: Date, end_date: Date): Promise<QrCodeLogsSchema[]> {
    //     return await this.ormRepo.createQueryBuilder('lq')
    //         .select([
    //             'lq.lq_created_at AS lq_created_at',
    //             'lq.lq_whatsapp_number AS lq_whatsapp_number',
    //             'lq.lq_updated_at AS lq_updated_at',
    //             'lq.lq_is_sended_code AS lq_is_sended_code'
    //         ])
    //         .distinctOn([
    //             'lq.lq_whatsapp_number',
    //             'DATE(lq.lq_created_at)'
    //         ])
    //         .where("lq.lq_created_at BETWEEN :startDate AND :endDate", {
    //             startDate: start_date,
    //             endDate: end_date,
    //         })
    //         // .orderBy('lq.lq_created_at', 'DESC')
    //         .getRawMany();
    // }

}