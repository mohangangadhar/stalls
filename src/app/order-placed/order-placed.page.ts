import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.page.html',
  styleUrls: ['./order-placed.page.scss'],
})
export class OrderPlacedPage implements OnInit {
  private user = {};
  private orderProducts = [];

  constructor(private navCtrl: NavController, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.user = this.router.getCurrentNavigation().extras.state.user;
        this.orderProducts = this.router.getCurrentNavigation().extras.state.orderProducts;
      }
    });
  }

  ngOnInit() {
  }

  newOrder() {
    console.log(this.user);
    console.log(this.orderProducts);
    this.navCtrl.navigateForward(['./product']);
  }
}
