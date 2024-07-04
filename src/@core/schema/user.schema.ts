import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('USER')
export class UserLogsSchema {
    @PrimaryColumn()
    user_internal_id: string;

    @Column()
    user_name: string;

    @Column()
    user_whatsapp_number: string;

    @Column()
    user_first_input: string;

    @UpdateDateColumn({
        name: 'user_createdAt',
        default: () => 'CURRENT_TIMESTAMP',
    })
    user_createdAt: Date;

    @CreateDateColumn({
        name: 'user_updatedAt',
        type: 'timestamp',
    })
    user_updatedAt: Date;
}
