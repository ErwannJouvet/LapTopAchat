import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity/category.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';
import { ProductEntity } from 'src/products/product.entity/product.entity';

@Injectable()
export class CategorysService {

    constructor(@InjectRepository(CategoryEntity) private categoryRepository : Repository<CategoryEntity>, @Inject(ProductsService) private productService : ProductsService) {

    }

    async getCategorys() : Promise<CategoryEntity[]> {
        return await this.categoryRepository.find();
    }

    async getCategory(_id : number) : Promise<CategoryEntity[]> {
        return await this.categoryRepository.find({
            where : [{ "id" : _id}]
        });
    }

    async getCategoryProduct(_id : number) : Promise<ProductEntity[]> {
        return await this.productService.getProductsByCategory(_id);
    }

    async createCategory( category : CategoryEntity ) {
        return await this.categoryRepository.save(category);
    }

    async updateCategory( id : number ,  category : CategoryEntity ) {
        return await this.categoryRepository.update(id, category);
    }

    async deleteCategory(category : CategoryEntity ) {
        this.categoryRepository.delete(category);
    }


}
