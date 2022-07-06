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

  constructor(private navCtrl: NavController, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.society = this.router.getCurrentNavigation().extras.state.society;
      }
    });
  }

  ngOnInit() {
  }

  addProducts(){
    this.navCtrl.navigateForward(['./product']);
  }
}
