import { Injectable } from '@nestjs/common';
import IProducts from './product-dto/product-interface';

@Injectable()
export class ProductService {
    products: IProducts [] = [];

    findAllProducts(query: {page: string, take: string}) {
        let page = Number(query.page) || 1;
        let take = Number(query.take) || 10;

        if(!this.products.length) return "Product table empty";

        let startIndex = (page - 1) * take;
        let endIndex = startIndex + take;

        const data = this.products.slice(startIndex, endIndex);
        return {data, totalItem: this.products.length};
    }

    createProducts(data: Omit<IProducts, 'id'>) {
        const productLength = this.products.length;
        const newProduct = { ...data, id: productLength != 0 ? this.products.at( - 1)?.id! + 1 : 1};

        this.products.push(newProduct);
        return newProduct;
    }

    findOneProduct(id: number) {
        const findProduct = this.products.find((val) => val.id == id);
        if(!findProduct) return "Product not found ❗";

        return findProduct;
    }

    updateProducts(id: number, data: Partial<IProducts>) {
        const findProduct = this.products.findIndex((val) => val.id == id);
        if(findProduct == - 1) return "Product not found ❗";

        this.products[findProduct] = {...this.products[findProduct], ...data};

        return this.products[findProduct];
    }

    deleteProducts(id: number) {
        const findProduct = this.products.findIndex((val) => val.id == id);
        if(findProduct == - 1) return "Product not found ❗";

        this.products = this.products.filter((val) => val.id != id);
        return "Product deleted successfully ✅";
    }

    sortByName(query: string) {
      return this.products.sort((a, b) => {
        if(query === "asc") {
            return a.name.localeCompare(b.name);
        } else if(query === "desc") {
            return b.name.localeCompare(a.name);
        } 
        return 0;
      });
    }

    filterByPrice(min: number, max: number) {
        return this.products.filter((val) => val.price >= min && val.price <= max);
    }

    filterByColor(color: string) {
        return this.products.filter((val) => val.color.toLocaleLowerCase() === color.toLocaleLowerCase());
    }
}