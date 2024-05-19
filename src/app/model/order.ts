import { CartItem } from './cart-item';

export interface Order {
  id?: string; // optionnel car il sera ajouté par Firebase
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
  processed?: boolean; // Nouveau champ pour suivre l'état de traitement
}
