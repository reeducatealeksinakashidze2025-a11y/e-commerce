import { ProductCategory } from "../../shared/enums/products-category.enum";

export interface ProductViewModel {
    id?: string;
    name: string;
    category: ProductCategory;
    description?: string;
    quantity: number;
    price: number;
    isDiscounted: boolean;
    createdAt?: string;
}