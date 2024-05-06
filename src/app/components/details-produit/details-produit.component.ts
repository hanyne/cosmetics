import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/shared/cart.service';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-details-produit',
  templateUrl: './details-produit.component.html',
  styleUrls: ['./details-produit.component.css']
})
export class DetailsProduitComponent implements OnInit {
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) { }
  

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.productService.getProductById(productId).subscribe(product => {
          this.product = product;
        });
      }
    });
  }

  addToCart(): void {
    if (this.product) {
      // Ajoutez ici la logique pour ajouter le produit au panier
      this.cartService.addToCart(this.product);
      window.alert('Your product has been added to the cart!');
    }
  }
  
}
