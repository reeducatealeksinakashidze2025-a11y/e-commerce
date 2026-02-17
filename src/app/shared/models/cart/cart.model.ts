import { CartItem } from './cart-item.model';

export interface Cart {
  _id?: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
  createdAt?: Date;
  updatedAt?: Date;
}
