import { TypeuserEntity } from "src/typeusers/typeuser.entity/typeuser.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({length : 250})
    firstname : string;

    @Column({length : 250})
    lastname : string;

    @Column({length : 12})
    phone : string;

    @Column({length : 250, unique : true})
    email : string;

    @Column('text')
    password : string;

    @ManyToOne(type => TypeuserEntity, role => role.id)
    @JoinColumn({name : 'type'})
    type : TypeuserEntity;

    @Column({nullable : true})
    refreshtoken : string;

    @Column({nullable : true})
    refreshtokenexpires : string;
}
