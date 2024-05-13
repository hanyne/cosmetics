import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { CartService } from 'src/app/shared/cart.service';
import { Order } from 'src/app/model/order';
import { CartItem } from 'src/app/model/cart-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  customerDetails: any = {};
  cartItems: CartItem[] = [];
  successMessage: string = '';

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Subscribe to cart items changes
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  checkout(): void {
    const order: Order = {
      customer: this.customerDetails,
      items: this.cartItems, // Utiliser les articles actuels du panier
      deliveryCharge: 7, // Ajoutez des frais de livraison si nécessaire
      total: this.getTotalPrice() // Utiliser la méthode pour calculer le prix total
    };

    this.orderService.placeOrder(order)
      .then(() => {
        // Effacez le panier après la commande
        this.cartService.clearCart();
        this.router.navigate(['/cart']);
      })
      .catch(error => {
        console.error('Error placing order:', error);
        // Gérez l'erreur, affichez un message à l'utilisateur, etc.
      });
      
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
