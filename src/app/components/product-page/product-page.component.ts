import { Component } from '@angular/core';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/shared/cart.service';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {
  products: Product[];
  selectedProduct: Product;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }



  getProducts(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }
addToCart(product: Product) {
  console.log('Product added to cart:', product);
  this.cartService.addToCart(product);
  window.alert('Your product has been added to the cart!');
}
showProductDetails(productId: string): void {
  this.productService.getProductById(productId).subscribe(product => {
    this.selectedProduct = product;
  });
}
}
