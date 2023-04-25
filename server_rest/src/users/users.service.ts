import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { serialize } from 'v8';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private userRepository : Repository<UserEntity>) { }

    async getUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async findOne(username : string) : Promise<UserEntity | undefined> {
        let users = await this.userRepository.find(
            {relations:{type:true}, where : [{"email" : username}]}
        )
        if (users.length == 1) {
            return users[0];
        } else {
            return undefined;
        }
    }

    async getUser(_id : number) : Promise<UserEntity[]> {
        return await this.userRepository.find({
            relations : {type : true},
            where : [{"id" : _id}]
        });
    }

    async createUser(user : UserEntity) {
        if (user.password) {
            const password = user.password;
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(password, saltOrRounds);
            user.password = hash;
        }
        return await this.userRepository.save(user);
    }

    async updateUser(id : number, user : UserEntity) {
        const idUser = user.id;
        if (user.password) {
            const password = user.password
            const saltOrRounds = 10;
            const hash = bcrypt.hash(password, saltOrRounds);
            user.password = hash;
        }
        return await this.userRepository.update(id , user);
    }

    //pas d'await donc pas besoin  d'async
    deleteUser(user : UserEntity) {
        return this.userRepository.delete(user);
    }

    async saveorupdateRefreshToken(refreshToken:string,
        id:string, 
        refreshtokenexpires){
        await this.userRepository.update(id,{refreshtoken:refreshToken, refreshtokenexpires});
    }
}