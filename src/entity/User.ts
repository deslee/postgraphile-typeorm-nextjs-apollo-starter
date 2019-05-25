import { Auditable } from "./Auditable";
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Index } from "typeorm";
import config from "../../config";

@Entity({
    schema: config.db.schema
})
export class User implements Auditable {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({
        unique: true
    })
    @Index()
    email: string;

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

@Entity({
    schema: 'app_private'
})
export class PrivateUser implements Auditable {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    password: string;

    @Column()
    createdBy: string;

    @Column()
    updatedBy: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}