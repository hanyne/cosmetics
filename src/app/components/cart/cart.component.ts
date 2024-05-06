import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/cart.service';
import { Observable, map } from 'rxjs';
import { Product } from '../../model/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems$: Observable<Product[]>;
  cartTotal$: Observable<number>;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems$ = this.cartService.getCartItems();
    this.cartTotal$ = this.cartService.getCartItems().pipe(
      map(items => this.cartService.calculateTotal())
    );
  }

  removeFromCart(productId: string): void {
    this.cartService.removeFromCart(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
