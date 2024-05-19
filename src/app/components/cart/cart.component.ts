import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/cart.service';
import { CartItem } from 'src/app/model/cart-item';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  customerInfo: any = {};
  isCheckout: boolean = false;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
    
  ) {}
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
  confirmCheckout(): void {
    this.isCheckout = true; // Affiche le formulaire de checkout
  }
  goToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
  goToProducts() {
    this.router.navigate(['/product']);
  }

}