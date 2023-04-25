import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TypeusersService } from './typeusers.service';
import { TypeuserEntity } from './typeuser.entity/typeuser.entity';

@Controller('typeusers')
export class TypeusersController {

    constructor(private service : TypeusersService) {}

    @Get()
    getAll(@Param() params) {
        return this.service.getTypeUsers;
    }

    @Get(':id')
    get(@Param() params) {
        return this.service.getTypeUser(params.id);
    }

    @Post()
    create(@Body() typeuser : TypeuserEntity) {
        return this.service.createTypeUser(typeuser);
    }

    @Put()
    update(@Body() typeuser : TypeuserEntity) {
        return this.service.updateTypeUser(typeuser);
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.service.deleteTypeUser(params.id);
    }
}
