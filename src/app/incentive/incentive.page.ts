import { Component, OnInit } from '@angular/core';
import { SocietyService } from '../services/society.service';

@Component({
  selector: 'app-incentive',
  templateUrl: './incentive.page.html',
  styleUrls: ['./incentive.page.scss'],
})
export class IncentivePage implements OnInit {

  amount = 0;
  incentive  = 0;
  constructor(private societyService: SocietyService) { }

  ngOnInit() {
    this.getIncentive();
  }

  getIncentive(){
    this.societyService.getIncentive().subscribe(
      amt => {
        this.amount = amt;
      }
    );

    if(this.amount >= 10000 && this.amount <20000){
      this.incentive = 500;
    }else if(this.amount >= 20000 && this.amount <30000){
      this.incentive = 1500;
    }else if(this.amount >= 30000 && this.amount <40000){
      this.incentive = 3000;
    }else if(this.amount >= 40000 && this.amount <50000){
      this.incentive = 5000;
    }else if(this.amount >= 50000 && this.amount <60000){
      this.incentive = 7500;
    }else {
      this.incentive = 0;
    }
  }

}
