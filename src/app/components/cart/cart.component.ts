import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/cart.service';
import { CartItem } from 'src/app/model/cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  removeFromCart(cartItem: CartItem): void {
    this.cartService.removeFromCart(cartItem);
  }

  increaseQuantity(cartItem: CartItem): void {
    cartItem.quantity++;
    this.cartService.updateCartItem(cartItem);
  }

  decreaseQuantity(cartItem: CartItem): void {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
      this.cartService.updateCartItem(cartItem);
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      if (item.product) {
        return total + (item.product.price * item.quantity);
      } else {
        return total;
      }
    }, 0);
  }
}