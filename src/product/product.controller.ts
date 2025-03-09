import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import IProducts from './product-dto/product-interface';

@Controller('products')
export class ProductController {
    constructor (private readonly productService: ProductService) {}

    @Get('sort-name')
    getWithName(@Query('name') name: string){
        return this.productService.sortByName(name);
    }

    @Get('filter-price')
    filterPrice(@Query('minPrice, maxPrice') min: number, max: number){
        return this.productService.filterByPrice(min, max);
    }

    @Get('filter-color')
    filterColor(@Query('color') color: string){
        return this.productService.filterByColor(color);
    }

    @Get()
    findAll(@Query() query: {page: string, take: string}) {
        return this.productService.findAllProducts(query);
    }

    @Post()
    create(@Body() data: Omit<IProducts, 'id'>) {
        return this.productService.createProducts(data);
    }

    @Get(':id')
    findOne(@Param('id') id: IProducts){
        return this.productService.findOneProduct(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: IProducts) {
        return this.productService.updateProducts(+id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.productService.deleteProducts(+id);
    }
}