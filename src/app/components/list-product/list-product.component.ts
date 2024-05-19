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
  categories$: Observable<string[]>;
  subcategories$: Observable<string[]>;
  subSubcategories$: Observable<string[]>;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
    this.categories$ = this.productService.getDistinctCategories();
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
    this.loadSubcategories(this.newProduct.category.main);
    this.loadSubSubcategories(this.newProduct.category.main, this.newProduct.category.subcategory);
  }

  async saveUpdatedProduct(): Promise<void> {
    try {
      let updatedProduct: Product;

      if (!this.isAdding && this.selectedProduct) {
        if (this.newProduct.image === '' || this.newProduct.image === this.selectedProduct.image) {
          updatedProduct = { ...this.selectedProduct, ...this.newProduct, image: this.selectedProduct.image };
          await this.productService.updateProduct(updatedProduct);
          console.log('Produit mis à jour avec succès');
        } else {
          const imageFile = (document.getElementById('imageInput') as HTMLInputElement).files[0];
          const imageUrl = await this.productService.uploadImage(imageFile).toPromise();
          updatedProduct = { ...this.selectedProduct, ...this.newProduct, image: imageUrl };
          await this.productService.updateProduct(updatedProduct);
          console.log('Produit mis à jour avec succès');
        }
      } else {
        console.error('Aucun produit sélectionné pour la mise à jour');
      }

      this.newProduct = { name: '', description: '', shortDescription: '', image: '', category: { main: '', subcategory: '', subSubcategory: '' }, price: 0 };
      this.selectedProduct = null;
      this.isAdding = true;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit :', error);
    }
  }

  loadSubcategories(category: string): void {
    this.subcategories$ = this.productService.getDistinctSubcategories(category);
  }

  loadSubSubcategories(category: string, subcategory: string): void {
    this.subSubcategories$ = this.productService.getDistinctSubSubcategories(category, subcategory);
  }
}
