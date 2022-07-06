import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  logs: string[] = [];

  constructor(private navCtrl: NavController) { }

  pushLog(msg) {
    this.logs.unshift(msg);
  }

  handleChange(e) {
    const navigationExtras: NavigationExtras = { state: { society: e.detail.value } };
    this.navCtrl.navigateForward(['./add-name'], navigationExtras);
  }

}
