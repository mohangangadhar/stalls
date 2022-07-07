import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { SocietyService } from 'src/app/services/society.service';

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
  private currentPage = 1;

  constructor(private navCtrl: NavController, private route: ActivatedRoute,
    private router: Router, private societyService: SocietyService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.society = this.router.getCurrentNavigation().extras.state.society;
      }
    });
  }

  ngOnInit() {
    this.getProductList();
  }

  async getProductList(event?: any) {
    this.societyService.getProductList(this.currentPage).subscribe(
      (res) => {
        console.log(res);
        this.products.push(...res);
        event?.target.complete();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onInputChange(event, i) {
    this.total = 0;
    let sum = 0;
    if (isNaN(parseInt(event.detail.value, 10))) {
      event.detail.value = 0;
    }
    this.qty[i] = Math.round(this.products[i].cost * event.detail.value);

    this.qty.forEach(x => { sum += x; });
    this.total = sum;
  }

  onClickTotal() {
    const navigationExtras: NavigationExtras = { state: { society: this.society } };
    if (this.total > 0) {
      this.navCtrl.navigateForward(['./product'], navigationExtras);
    }
  }

  addUser() {
    this.navCtrl.navigateForward(['./add-name']);
  }
}
