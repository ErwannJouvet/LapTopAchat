import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity/category.entity';
import { CategorysService } from './categorys.service';
import { CategorysController } from './categorys.controller';
import { ProductsModule } from 'src/products/products.module';

@Module({
    imports: [TypeOrmModule.forFeature([CategoryEntity]), ProductsModule],
    providers : [CategorysService],
    controllers : [CategorysController]
})
export class CategorysModule {}
