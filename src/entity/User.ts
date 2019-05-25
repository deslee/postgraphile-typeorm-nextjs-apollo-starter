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
    @Index({unique: true})
    email: string;

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

@Entity({
    schema: 'app_private'
})
export class PrivateUser implements Auditable {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    password: string;

    @Column({nullable: true})
    createdBy: string;

    @Column({nullable: true})
    updatedBy: string;

    @Column({nullable: true})
    createdAt: Date;

    @Column({nullable: true})
    updatedAt: Date;
}