import { Component } from '@angular/core';
import { CartService } from 'src/app/shared/cart.service';
import { CartItem } from 'src/app/model/cart-item';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  cartItems: CartItem[] = [];
  isDropdownOpen: boolean = false;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  // Function to toggle the dropdown menu
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
