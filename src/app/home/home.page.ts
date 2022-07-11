import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { SocietyService } from 'src/app/services/society.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  societyList = [];
  currentPage = 1;
  name = '';
  logs: string[] = [];
  society = '';

  constructor(private navCtrl: NavController, private societyService: SocietyService) { }

  ngOnInit() {
    this.loadSocietyList();
  }

  async loadSocietyList(event?: any) {
    this.societyService.getAllSocietyList(this.currentPage).subscribe(
      (res) => {
        console.log(res);
        this.societyList.push(...res);
        event?.target.complete();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onNameChange(event) {
    this.name = event.detail.value;
  }

  pushLog(msg) {
    this.logs.unshift(msg);
  }

  onSocietyChange(event) {
    if (isNaN(parseInt(event.detail.value, 10))) {
      event.detail.value = 0;
    }
    const index = parseInt(event.detail.value, 10) - 1;
    this.society = this.societyList[index];
  }

  submit() {
    const navigationExtras: NavigationExtras = { state: { society: this.society, name: this.name } };
    this.navCtrl.navigateForward(['./product'], navigationExtras);
  }

}
