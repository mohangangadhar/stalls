import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  private total = 0;
  private products = [];
  private qty = [];
  private society = '';

  constructor(private navCtrl: NavController, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.society = this.router.getCurrentNavigation().extras.state.society;
      }
    });
  }

  ngOnInit() {
    this.products = [
      {
        name: 'Jamun',
        price: 50
      },
      {
        name: 'Banana',
        price: 30
      },
      {
        name: 'Mango',
        price: 300
      }
    ];
  }

  onInputChange(event, i) {
    this.total = 0;
    let sum = 0;
    if (isNaN(parseInt(event.detail.value, 10))) {
      event.detail.value = 0;
    }
    this.qty[i] = Math.round(this.products[i].price * event.detail.value);

    this.qty.forEach(x => { sum += x; });
    this.total = sum;
  }

  onClickTotal() {
    const navigationExtras: NavigationExtras = { state: { society: this.society } };
    if (this.total > 0) {
      this.navCtrl.navigateForward(['./product'], navigationExtras);
    }
  }

  placeOrder(){
    this.navCtrl.navigateForward(['./order-placed']);
  }
}
