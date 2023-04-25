import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TypeuserEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({length : 250})
    name : string;
}