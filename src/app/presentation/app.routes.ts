import {Routes} from '@angular/router';

export class Paths {
  static readonly home = 'home';
  static readonly productCreate = 'product/create';
  static readonly productModify = 'product/modify';
}

export const routes: Routes = [
  {
    path: '',
    redirectTo: Paths.home,
    pathMatch: "full",
  },
  {
    path: Paths.home,
    loadComponent: () =>
      import('./components/home/home.component').then(mod => mod.HomeComponent),

  },
  {
    path: Paths.productCreate,
    loadComponent: () =>
      import('./components/product/product.component').then(mod => mod.ProductComponent),
    data: {
      isModifyMode: false
    }
  },
  {
    path: Paths.productModify,
    loadComponent: () =>
      import('./components/product/product.component').then(mod => mod.ProductComponent),
    data: {
      isModifyMode: true
    }
  },
];
