import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    
    constructor(private service : UsersService){

    }

    @Get()
    getAll(@Param() params) {
        return this.service.getUsers();
    }

    @Get(':id')
    get(@Param() params) {
        return this.service.getUser(params.id);
    }

    @Post()
    create(@Body() user : UserEntity) {
        return this.service.createUser(user);
    }

    @Put()
    update(@Body() user : UserEntity, idUser : UserEntity["id"]) {
        return this.service.updateUser(idUser, user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete()
    deleteUser(@Param() params) {
        return this.service.deleteUser(params.id);
    }
}
