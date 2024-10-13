import {Routes} from '@angular/router';

export class Paths {
  static readonly home = 'home';
  static readonly account = 'account';
}

export const routes: Routes = [
  {
    path: '',
    redirectTo: Paths.home,
    pathMatch: "full",
  },
  {
    path: Paths.home,
    loadComponent: () => import('./components/home/home.component').then(mod => mod.HomeComponent)
  },
  {
    path: Paths.home,
    loadComponent: () => import('./components/account/account.component').then(mod => mod.AccountComponent)
  },
];
