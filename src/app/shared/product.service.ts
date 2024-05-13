import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { Product } from '../model/product';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsCollection: AngularFirestoreCollection<Product>;

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) {
    this.productsCollection = firestore.collection<Product>('products');
  }

  getAllProducts(): Observable<Product[]> {
    return this.productsCollection.valueChanges({ idField: 'id' });
  }

  addProduct(product: Product): Promise<any> {
    return this.productsCollection.add(product);
  }

  deleteProduct(productId: string): Promise<void> {
    return this.productsCollection.doc(productId).delete();
  }

  updateProduct(product: Product): Promise<void> {
    const productId = product.id;
    return this.productsCollection.doc(productId).update(product);
  }

  uploadImage(imageFile: File): Observable<string> {
    const filePath = `/product_images/${Date.now()}_${imageFile.name}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, imageFile);

    return from(uploadTask).pipe(
      switchMap(() => fileRef.getDownloadURL())
    );
  }

  getProductById(productId: string): Observable<Product> {
    return this.productsCollection.doc<Product>(productId).valueChanges();
  }

  getDistinctCategories(): Observable<string[]> {
    return this.firestore.collection<Product>('products').valueChanges().pipe(
      map(products => products.map(product => product.category.main)),
      map(categories => Array.from(new Set(categories)))
    );
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.firestore.collection<Product>('products', ref => ref.where('category.main', '==', category))
      .valueChanges({ idField: 'id' });
  }

  getProductsBySubcategory(category: string, subcategory: string): Observable<Product[]> {
    return this.firestore.collection<Product>('products', ref => 
      ref.where('category.main', '==', category).where('category.subcategory', '==', subcategory))
      .valueChanges({ idField: 'id' });
  }

  getProductsBySubSubcategory(category: string, subcategory: string, subSubcategory: string): Observable<Product[]> {
    return this.firestore.collection<Product>('products', ref => 
      ref.where('category.main', '==', category)
        .where('category.subcategory', '==', subcategory)
        .where('category.subSubcategory', '==', subSubcategory))
      .valueChanges({ idField: 'id' });
  }


  getDistinctSubcategories(category: string): Observable<string[]> {
    return this.firestore.collection<Product>('products', ref => 
      ref.where('category.main', '==', category))
      .valueChanges()
      .pipe(
        map(products => products.map(product => product.category.subcategory)),
        map(subcategories => Array.from(new Set(subcategories)))
      );
  }
  
  getDistinctSubSubcategories(category: string, subcategory: string): Observable<string[]> {
    return this.firestore.collection<Product>('products', ref => 
      ref.where('category.main', '==', category).where('category.subcategory', '==', subcategory))
      .valueChanges()
      .pipe(
        map(products => products.map(product => product.category.subSubcategory)),
        map(subSubcategories => Array.from(new Set(subSubcategories)))
      );
  }
}
