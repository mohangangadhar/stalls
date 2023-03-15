import { Component, OnInit } from '@angular/core';
import { SocietyService } from 'src/app/services/society.service';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.scss'],
})
export class OrderListPage implements OnInit {

  private orderList = [];
  constructor(private societyService: SocietyService) { }

  ngOnInit() {
    this.loadOrders();
  }

  async loadOrders(event?: any) {
    this.societyService.getOrderList().subscribe(
      (res) => {
        this.orderList.push(...res.content);
        event?.target.complete();
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
