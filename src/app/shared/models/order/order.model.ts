import { OrderItem } from './order-item.model';
import { ShippingAddress } from './shipping-address.model';

export interface Order {
  _id?: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}
