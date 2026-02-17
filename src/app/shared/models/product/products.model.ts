import { ProductCategory } from "../../enums/products-category.enum";

export interface Products {
    _id?: string;
    name: string;
    category: ProductCategory;
    description?: string;
    quantity: number;
    price: number;
    images?: string[];
    isDiscounted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}