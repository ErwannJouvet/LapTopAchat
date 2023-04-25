import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeuserEntity } from './typeuser.entity/typeuser.entity';
import { Repository } from 'typeorm';
import { type } from 'os';

@Injectable()
export class TypeusersService {
    
    constructor(@InjectRepository(TypeuserEntity) private typeUsersRepository:
    Repository<TypeuserEntity>) { }

    async getTypeUsers(): Promise<TypeuserEntity[]> {
        return await this.typeUsersRepository.find();
    }

    async getTypeUser(_id : number) : Promise<TypeuserEntity[]> {
        return await this.typeUsersRepository.find({
            where : [{ "id" : _id}]
        });
    }

    async createTypeUser (typeUser : TypeuserEntity) {
        return await this.typeUsersRepository.save(typeUser);
    }

    async updateTypeUser (typeUser : TypeuserEntity) {
        this.typeUsersRepository.save(typeUser);
    }

    async deleteTypeUser (typeUser : TypeuserEntity) {
        this.typeUsersRepository.delete(typeUser);
    }
}
