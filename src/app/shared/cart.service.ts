// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../model/product';
import { CartItem } from '../model/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  public cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();

  private storageKey = 'cartItems';

  constructor() {
    const cartItems = JSON.parse(localStorage.getItem(this.storageKey));
    if (cartItems) {
      this.cartItemsSubject.next(cartItems);
    }
  }

  addToCart(product: Product): void {
    const currentCartItems = this.cartItemsSubject.getValue();
    const cartItemIndex = currentCartItems.findIndex(item => item.product.id === product.id);
    if (cartItemIndex > -1) {
      currentCartItems[cartItemIndex].quantity++;
    } else {
      currentCartItems.push({ product: product, quantity: 1 });
    }
    this.cartItemsSubject.next(currentCartItems);
    localStorage.setItem(this.storageKey, JSON.stringify(currentCartItems));
  }

  removeFromCart(cartItem: CartItem): void {
    const currentCartItems = this.cartItemsSubject.getValue();
    const updatedCartItems = currentCartItems.filter(item => item !== cartItem);
    this.cartItemsSubject.next(updatedCartItems);
    localStorage.setItem(this.storageKey, JSON.stringify(updatedCartItems));
  }

  updateCartItem(updatedCartItem: CartItem): void {
    const currentCartItems = this.cartItemsSubject.getValue();
    const cartItemIndex = currentCartItems.findIndex(item => item.product.id === updatedCartItem.product.id);
    if (cartItemIndex > -1) {
      currentCartItems[cartItemIndex] = updatedCartItem;
      this.cartItemsSubject.next(currentCartItems);
      localStorage.setItem(this.storageKey, JSON.stringify(currentCartItems));
    }
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    localStorage.removeItem(this.storageKey);
  }
}
