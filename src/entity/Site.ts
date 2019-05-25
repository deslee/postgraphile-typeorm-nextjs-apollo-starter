import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Auditable } from './Auditable';
import config from "../../config";

@Entity({
    schema: config.db.schema
})
export class Site implements Auditable {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column({
        type: 'jsonb'
    })
    data: string;

    @Column()
    createdBy: string;

    @Column()
    updatedBy: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}