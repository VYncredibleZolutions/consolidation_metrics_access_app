import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('METRICS')
export class MetricsSchema {
    @PrimaryColumn()
    metrics_internal_id: string;

    @Column()
    metrics_count_access: number;

    @Column()
    metrics_day: number;

    @Column()
    metrics_month: string;

    @Column()
    metrics_year: number;

    @Column({
        nullable: true,
        type: 'timestamp'
    })
    metrics_date_sessions_created: Date;

    @CreateDateColumn({
        name: 'metrics_created_at',
        type: 'timestamp',
    })
    metrics_created_at: Date;

    @UpdateDateColumn({
        name: 'metrics_updated_at',
        type: 'timestamp',
    })
    metrics_updated_at: Date;

}
