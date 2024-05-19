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
  selectedProduct: Product;

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
addToCart(product: Product) {
  console.log('Product added to cart:', product);
  this.cartService.addToCart(product);
  window.alert('Votre produit a été ajouté au panier !');

}
showProductDetails(productId: string): void {
  this.productService.getProductById(productId).subscribe(product => {
    this.selectedProduct = product;
  });
}
  
}