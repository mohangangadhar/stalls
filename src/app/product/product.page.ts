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
  private quantity = [];
  private society = '';
  private name = '';
  private currentPage = 1;
  private stallOrderProductsDTO = [];
  private paymentMethod = '';
  private phone = '';
  private email = '';
  private stallManager = '';
  private adjustedAmount = '';
  private comment = '';
  private address = '';
  private orderType = { type: '', id: '' };
  private request = {
    stallUserDTO: {
      name: '',
      contact: '',
      email: '',
      address: '',
    },
    stallOrderProductsDTO: [],
    orderPersonName: '',
    totalAmount: 0,
    adjustedAmount: 0,
    paymentMethod: '',
    comments: '',
    orderType: ''
  };

  private user = {
    phone: '',
    name: '',
    email: '',
    society: '',
    address: ''
  };

  private orderTypeList = [
    {
      type: 'Order',
      id: 1
    },
    {
      type: 'Online Order',
      id: 2
    },
    {
      type: 'Inbound',
      id: 3
    },
    {
      type: 'Outbound',
      id: 4
    },
    {
      type: 'Tasting',
      id: 5
    },
    {
      type: 'Wastage',
      id: 6
    },
    {
      type: 'Misc',
      id: 7
    }
  ];

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
    const stallOrderProducts = [];
    const orderProduct = {
      total: 0,
      productName: '',
      quantity: 0,
      id: 0
    };
    this.stallOrderProductsDTO.forEach((order, index) => {
      if (order == null) {
        stallOrderProducts[index] = orderProduct;
      } else {
        stallOrderProducts[index] = order;
      }
    });

    this.user.society = this.society;

    this.request.stallUserDTO.name = this.user.name;
    this.request.stallUserDTO.contact = this.user.phone;
    this.request.stallUserDTO.email = this.user.email;

    this.request.stallOrderProductsDTO = stallOrderProducts;
    this.request.orderPersonName = this.name;
    this.request.totalAmount = this.total;
    this.request.paymentMethod = this.paymentMethod === '' || this.paymentMethod == null ? 'QR' : this.paymentMethod;
    this.request.orderType = this.orderType.type === '' || this.orderType.type == null ? 'Order' : this.orderType.type;

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
        this.request = {
          stallUserDTO: {
            name: '',
            contact: '',
            email: '',
            address: ''
          },
          stallOrderProductsDTO: [],
          orderPersonName: '',
          totalAmount: 0,
          adjustedAmount: 0,
          paymentMethod: '',
          comments: '',
          orderType: ''
        };
        this.stallManager = '';
        this.phone = '';
        this.email = '';
        this.adjustedAmount = '';
        this.comment = '';
        this.quantity = [];
        this.total = 0;
        this.address = '';
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onAdjustedAmount(event?: any) {
    if (isNaN(parseInt(event.detail.value, 10))) {
      event.detail.value = 0;
    }
    this.request.adjustedAmount = event.detail.value;
  }

  onCommentChange(event?: any) {
    if (isNaN(event.detail.value)) {
      this.request.comments = event.detail.value;
    }
  }

  onPhoneChange(event?: any) {
    if (isNaN(parseInt(event.detail.value, 10))) {
      event.detail.value = 0;
    }
    this.user.phone = event.detail.value;
  }

  onNameChange(event?: any) {
    this.user.name = event.detail.value;
  }

  onEmailChange(event?: any) {
    this.user.email = event.detail.value;
  }

  onOrderTypeChange(event?: any) {
    this.orderType = event.detail.value;
  }

  onAddressChange(event?: any) {
    this.user.address = event.detail.value;
  }
  async getProductList(event?: any) {
    this.societyService.getProductList(this.currentPage).subscribe(
      (res) => {
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
      productName: '',
      quantity: 0,
      id: 0
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

    orderProduct.productName = order.name;
    orderProduct.id = parseInt(order.id, 10);
    orderProduct.total = parseInt(order.cost, 10) * parseFloat(event.detail.value);
    orderProduct.quantity = event.detail.value;

    this.stallOrderProductsDTO[i] = orderProduct;
    this.qty.forEach(x => { sum += x; });
    this.total = sum;
  }

  onPaymentChange(event?: any) {
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
