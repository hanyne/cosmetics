import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/order.service';
import { Order } from '../../model/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-admin',
  templateUrl: './dash-admin.component.html',
  styleUrls: ['./dash-admin.component.css']
})
export class DashAdminComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  markAsProcessed(orderId: string) {
    this.orderService.updateOrderStatus(orderId, true).then(() => {
      console.log('Order marked as processed');
    });
  }

  markAsUnprocessed(orderId: string) {
    this.orderService.updateOrderStatus(orderId, false).then(() => {
      console.log('Order marked as unprocessed');
    });
  }

  deleteOrder(orderId: string) {
    this.orderService.deleteOrder(orderId).then(() => {
      console.log('Order deleted');
    });
  }

  viewOrderDetails(orderId: string) {
    this.router.navigate(['/admin/order-details', orderId]);
  }
}
