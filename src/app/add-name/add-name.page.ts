import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-name',
  templateUrl: './add-name.page.html',
  styleUrls: ['./add-name.page.scss'],
})
export class AddNamePage implements OnInit {

  private society = '';
  private orderProducts = [];
  private user = {
    phone: '',
    name: '',
    email: ''
  };

  constructor(private navCtrl: NavController, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.society = this.router.getCurrentNavigation().extras.state.society;
        this.orderProducts = this.router.getCurrentNavigation().extras.state.orderProducts;
      }
    });
  }

  ngOnInit() {
  }


  onPhoneChange(event) {

    if (isNaN(parseInt(event.detail.value, 10))) {
      event.detail.value = 0;
    }
    this.user.phone = event.detail.value;
  }

  onNameChange(event) {
    this.user.name = event.detail.value;
  }

  onEmailChange(event) {
    this.user.email = event.detail.value;
  }

  placeOrder() {
    console.log(this.user);
    console.log(this.orderProducts);
    const navigationExtras: NavigationExtras = {
      state: {
        user: this.user,
        orderProducts: this.orderProducts
      }
    };
    this.navCtrl.navigateForward(['./order-placed'], navigationExtras);
  }
}
