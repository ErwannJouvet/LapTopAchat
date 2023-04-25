import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { CategoryEntity } from './category.entity/category.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('categorys')
export class CategorysController {

    constructor(private category : CategorysService) {
        
    }

    @Get()
    getAll(@Param() params) {
        return this.category.getCategorys();
    }
    
    @Get(':id') //ici on dit que dans les paramètres qu'on envoie dans le get on a un parametre qui s'appelle id
    get(@Param() params) { //ici on lui dit qu'on envoie les paramètre du get dans notre fonction et c'est grâce à ça qu'on peut faire le params.id
        return this.category.getCategory(params.id);
    }

    @Get(':id/products')
    getProducts(@Param() params) {
        return this.category.getCategoryProduct(params.id);
    }

    @UseGuards(AuthGuard('jwt-admin'))
    @Post()
    create(@Body() category : CategoryEntity) {
        return this.category.createCategory(category);
    }

    @UseGuards(AuthGuard('jwt-admin'))
    @Put(':id')
    update(@Param() params, @Body() category : CategoryEntity) {
        return this.category.updateCategory(params.id, category);
    }
    @UseGuards(AuthGuard('jwt-admin'))
    @Delete(':id')
    delete(@Param() params) {
        return  this.category.deleteCategory(params.id);
    }
}
