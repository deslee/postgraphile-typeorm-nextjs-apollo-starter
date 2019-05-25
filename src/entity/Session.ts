import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity({
    schema: 'app_private'
})
export class Session {
    @PrimaryGeneratedColumn()
    token: string;

    @OneToOne(_ => User)
    @JoinColumn({name: 'userId'})
    user: User;

    @Column()
    invalidAfter: Date;

    @Column()
    data: string;
}