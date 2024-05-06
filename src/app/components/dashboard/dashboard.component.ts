import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { CartService } from 'src/app/shared/cart.service';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isDropdownOpen: boolean = false;
  products: Product[];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  getProducts(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }

  addToCart(product: Product): void {
    console.log("Product added to cart:", product);
    this.cartService.addToCart(product);
    console.log("Cart items after addition:", this.cartService.getCartItems());
  }
  
}