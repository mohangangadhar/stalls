import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncentivePage } from './incentive.page';

const routes: Routes = [
  {
    path: '',
    component: IncentivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncentivePageRoutingModule {}
