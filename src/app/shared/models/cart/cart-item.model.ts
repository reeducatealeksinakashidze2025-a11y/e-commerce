export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  addedAt?: Date;
  name?: string;
  images?: string[];
}
