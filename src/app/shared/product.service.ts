import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { Product } from '../model/product';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, switchMap } from 'rxjs/operators';

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
   // Method to get product details by ID
   getProductById(productId: string): Observable<Product> {
    return this.productsCollection.doc<Product>(productId).valueChanges();
  }
}
