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
  private name = '';
  private currentPage = 1;
  private stallOrderProductsDTO = [];
  private paymentMethod = '';
  private request = {
    stallUserDTO: {
      name: '',
      contact: '',
      email: ''
    },
    stallOrderProductsDTO: [],
    orderPersonName: '',
    totalAmount: 0,
    adjustedTotal: 0,
    paymentMethod: ''
  };

  private user = {
    phone: '',
    name: '',
    email: ''
  };

  constructor(private navCtrl: NavController, private route: ActivatedRoute,
    private router: Router, private societyService: SocietyService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.society = this.router.getCurrentNavigation().extras.state.society;
        this.name = this.router.getCurrentNavigation().extras.state.name;
      }
    });
  }

  ngOnInit() {
    this.getProductList();
  }

  placeOrder() {
    console.log(this.user);
    console.log(this.stallOrderProductsDTO);

    this.request.stallUserDTO.name = this.user.name;
    this.request.stallUserDTO.contact = this.user.phone;
    this.request.stallUserDTO.email = this.user.email;

    this.request.stallOrderProductsDTO = this.stallOrderProductsDTO;
    this.request.orderPersonName = this.name;
    this.request.totalAmount = this.total;
    this.request.paymentMethod = this.paymentMethod;

    console.log(this.request);

    this.createOrder(this.request);

    const navigationExtras: NavigationExtras = {
      state: {
        user: this.user,
        orderProducts: this.stallOrderProductsDTO
      }
    };
    this.navCtrl.navigateForward(['./order-placed'], navigationExtras);
  }

  async createOrder(request?: any) {
    this.societyService.createOrder(this.currentPage, request).subscribe(
      (res) => {
        console.log('Order Created');
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
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
    const orderProduct = {
      total: 0,
      name: '',
      quantity: 0
    };
    this.total = 0;
    let sum = 0;
    let order = {
      id: '',
      name: '',
      cost: '',
      quantity: ''
    };

    if (isNaN(parseInt(event.detail.value, 10))) {
      event.detail.value = 0;
    }
    this.qty[i] = Math.round(this.products[i].cost * event.detail.value);
    order = this.products[i];
    order.quantity = event.detail.value;
    orderProduct.total = parseInt(order.cost, 10);
    orderProduct.name = order.name;
    orderProduct.quantity = event.detail.value;
    this.stallOrderProductsDTO[i] = orderProduct;
    console.log(this.stallOrderProductsDTO);
    this.qty.forEach(x => { sum += x; });
    this.total = sum;
  }

  onPaymentChange(event) {
    this.paymentMethod = event.detail.value;
  }

  onClickTotal() {
    if (this.total > 0) {
      this.navCtrl.navigateForward(['./product']);
    }
  }

  addUser() {
    const navigationExtras: NavigationExtras =
    {
      state: {
        society: this.society,
        orderProducts: this.stallOrderProductsDTO
      }
    };
    this.navCtrl.navigateForward(['./add-name'], navigationExtras);
  }
}
