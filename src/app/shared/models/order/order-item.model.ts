export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  name?: string;
  images?: string[];
}
