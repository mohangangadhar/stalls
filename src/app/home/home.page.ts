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
  society = {
    id: 0,
    name: '',
    city:''
  };
  societyId = 0;
  data = {};

  constructor(private navCtrl: NavController, private societyService: SocietyService) { }

  ngOnInit() {
    this.loadSocietyList();
  }

  async loadSocietyList(event?: any) {
    this.societyService.getAllSocietyList(this.currentPage).subscribe(
      (res) => {
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
    this.data = { society: this.society.name, name: this.name, societyId: this.society.id };
    const navigationExtras: NavigationExtras = { queryParams: { data: JSON.stringify(this.data) } };
    this.navCtrl.navigateForward(['./product'], navigationExtras);
  }

}
