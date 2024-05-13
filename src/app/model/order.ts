import { CartItem } from './cart-item';

export interface Order {
  customer: {
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    email: string;
    // Vous pouvez ajouter d'autres détails du client si nécessaire
  };
  items: CartItem[];
  deliveryCharge: number;
  total: number;
}
