import { Component, OnInit } from '@angular/core';
import { Order } from 'src/interfaces/Order.interface';
import { OrderDetailService } from './order-detail.service';
import { ActivatedRoute } from '@angular/router';
import { RegaloService } from '../regalo.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit{

  order: Order | undefined = undefined;
  id: number | undefined;
  details: {regalo: any, quantity: number}[] = [];

  constructor(private orderDetailService: OrderDetailService, private route: ActivatedRoute, private regaloService: RegaloService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.orderDetailService.getOrderDetail(this.id).subscribe(order => {
        this.order = order;
        console.log(this.order);

        this.order.details.forEach(async detail => {
          const regalo = await this.regaloService.getRegalo(detail.id_product);

          this.details.push({
            regalo: regalo,
            quantity: detail.quantity
          })
        })

      });
    });
  }

  getTotal(): number {

    let total = 0;

    this.details.forEach(detail => {

      total += detail.regalo.price * detail.quantity;
    })

    return total;
  }

}
