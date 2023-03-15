import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then(m => m.ProductPageModule)
  },
  {
    path: 'add-name',
    loadChildren: () => import('./add-name/add-name.module').then(m => m.AddNamePageModule)
  },
  {
    path: 'order-placed',
    loadChildren: () => import('./order-placed/order-placed.module').then( m => m.OrderPlacedPageModule)
  },
  {
    path: 'order-list',
    loadChildren: () => import('./order-list/order-list.module').then( m => m.OrderListPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
