import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNamePageRoutingModule } from './add-name-routing.module';

import { AddNamePage } from './add-name.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNamePageRoutingModule
  ],
  declarations: [AddNamePage]
})
export class AddNamePageModule {}
