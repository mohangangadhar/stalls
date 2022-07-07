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

  logs: string[] = [];

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


  pushLog(msg) {
    this.logs.unshift(msg);
  }

  handleChange(e) {
    const navigationExtras: NavigationExtras = { state: { society: e.detail.value } };
    this.navCtrl.navigateForward(['./add-name'], navigationExtras);
  }

}
