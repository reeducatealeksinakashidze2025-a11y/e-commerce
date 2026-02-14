import { ProductCategory } from "../../enums/products-category.enum";

export interface Products {
    name: string;
    category: ProductCategory;
    description?: string;
    quantity: number;
    price: number;
}