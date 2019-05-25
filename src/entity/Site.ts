import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { Auditable } from './Auditable';
import config from "../../config";

@Entity({
    schema: config.db.schema
})
export class Site implements Auditable {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({unique: true})
    @Index({unique: true})
    name: string;

    @Column({
        type: 'jsonb'
    })
    data: string;

    @Column({nullable: true})
    createdBy: string;

    @Column({nullable: true})
    updatedBy: string;

    @Column({nullable: true})
    createdAt: Date;

    @Column({nullable: true})
    updatedAt: Date;
}