import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { order } from '../data-type';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent {
  orderData: order[] | undefined;

  constructor(private product: ProductsService) { }

  ngOnInit() {
    this.getOrderList();
  }

  cancelOrder(orderId: number | undefined) {
    orderId && this.product.cancelOrder(orderId).subscribe((result) => {
      this.getOrderList();
    });
  }
  getOrderList() {
    this.product.orderList().subscribe((result) => {
      this.orderData = result;
    });
  }
}
