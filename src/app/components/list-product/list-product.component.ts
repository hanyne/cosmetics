import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/product.service';
import { Observable } from 'rxjs';
import { Product } from '../../model/product';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  products$: Observable<Product[]>;
  newProduct: Product = { name: '', description: '', shortDescription: '', image: '', category: { main: '', subcategory: '', subSubcategory: '' }, price: 0 };
  selectedProduct: Product;
  isAdding: boolean = true;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.products$ = this.productService.getAllProducts();
  }

  async addProduct(): Promise<void> {
    try {
      const imageFile = (document.getElementById('imageInput') as HTMLInputElement).files[0];
      const imageUrl = await this.productService.uploadImage(imageFile).toPromise();
      
      this.newProduct.image = imageUrl;

      await this.productService.addProduct(this.newProduct);
      this.newProduct = { name: '', description: '', shortDescription: '', image: '', category: { main: '', subcategory: '', subSubcategory: '' }, price: 0 };
      console.log('Produit ajouté avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit :', error);
    }
  }

  async deleteProduct(productId: string): Promise<void> {
    try {
      await this.productService.deleteProduct(productId);
      console.log('Produit supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression du produit :', error);
    }
  }

  updateProduct(product: Product): void {
    this.selectedProduct = { ...product };
    this.newProduct = { ...product };
    this.isAdding = false;
  }

  async saveUpdatedProduct(): Promise<void> {
    try {
      if (!this.isAdding && this.selectedProduct) {
        let updatedProduct: Product;
        
        if (this.newProduct.image === '') {
          updatedProduct = { ...this.selectedProduct, ...this.newProduct, image: this.selectedProduct.image };
        } else {
          const imageFile = (document.getElementById('imageInput') as HTMLInputElement).files[0];
          const imageUrl = await this.productService.uploadImage(imageFile).toPromise();
          updatedProduct = { ...this.selectedProduct, ...this.newProduct, image: imageUrl };
        }
  
        await this.productService.updateProduct(updatedProduct);
        console.log('Produit mis à jour avec succès');
      } else {
        await this.addProduct(); // Ajoutez cette ligne pour appeler la méthode addProduct() lorsque vous ajoutez un nouveau produit
        console.log('Produit ajouté avec succès');
      }
  
      this.newProduct = { name: '', description: '', shortDescription: '', image: '', category: { main: '', subcategory: '', subSubcategory: '' }, price: 0 };
      this.selectedProduct = null;
      this.isAdding = true;
    } catch (error) {
      console.error('Erreur lors de la mise à jour ou de l\'ajout du produit :', error);
    }
  }
  

}
