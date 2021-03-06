import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    uid: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    country: string;
}
