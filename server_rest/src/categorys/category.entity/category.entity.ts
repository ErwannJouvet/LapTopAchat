import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({length : 250})
    name : string;
}
