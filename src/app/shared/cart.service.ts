import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public cartItems$: Observable<Product[]> = this.cartItemsSubject.asObservable();

  constructor() { }

  addToCart(product: Product): void {
    const currentCartItems = this.cartItemsSubject.getValue();
    const updatedCartItems = [...currentCartItems, product];
    this.cartItemsSubject.next(updatedCartItems);
  }

  removeFromCart(product: Product): void {
    const currentCartItems = this.cartItemsSubject.getValue();
    const updatedCartItems = currentCartItems.filter(item => item !== product);
    this.cartItemsSubject.next(updatedCartItems);
  }

  getCartItems(): Product[] {
    return this.cartItemsSubject.getValue();
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }
}
