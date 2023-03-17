import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncentivePageRoutingModule } from './incentive-routing.module';

import { IncentivePage } from './incentive.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncentivePageRoutingModule
  ],
  declarations: [IncentivePage]
})
export class IncentivePageModule {}
