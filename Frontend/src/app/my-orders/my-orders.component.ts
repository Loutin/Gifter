import { Component, OnInit } from '@angular/core';
import { MyOrdersService } from './my-orders.service';
import { Order } from 'src/interfaces/Order.interface';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders: Order[] = [];

  constructor(private myOrdersService: MyOrdersService) { }

  ngOnInit(): void {
    this.myOrdersService.getOrders().subscribe(orders => {
      this.orders = orders;
      console.log(this.orders);
    })
  }

}
