import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Order } from '../model/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersCollection = this.firestore.collection<Order>('orders');

  constructor(private firestore: AngularFirestore) {}

  placeOrder(order: Order): Promise<any> {
    order.processed = false;
    return this.ordersCollection.add(order);
  }

  getOrders(): Observable<Order[]> {
    return this.ordersCollection.valueChanges({ idField: 'id' });
  }

  getOrderById(orderId: string): Observable<Order> {
    return this.ordersCollection.doc(orderId).valueChanges() as Observable<Order>;
  }

  updateOrderStatus(orderId: string, processed: boolean): Promise<void> {
    return this.ordersCollection.doc(orderId).update({ processed });
  }

  deleteOrder(orderId: string): Promise<void> {
    return this.ordersCollection.doc(orderId).delete();
  }
}
