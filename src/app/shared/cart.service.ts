import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);

  constructor() { }

  getCartItems(): BehaviorSubject<Product[]> {
    return this.cartItemsSubject;
  }

  addToCart(product: Product): void {
    this.cartItems.push(product);
    this.cartItemsSubject.next(this.cartItems);
  }

  removeFromCart(productId: string): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.cartItemsSubject.next(this.cartItems);
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price || 0), 0);
  }
}
