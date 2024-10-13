import {Routes} from '@angular/router';

export class Paths {
  static readonly home = 'home';
  static readonly accountCreate = 'account/create';
  static readonly modifyAccount = 'account/modify';
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
    path: Paths.accountCreate,
    loadComponent: () =>
      import('./components/account/account.component').then(mod => mod.AccountComponent),
    data: {
      isModifyMode: false
    }
  },
  {
    path: Paths.modifyAccount,
    loadComponent: () =>
      import('./components/account/account.component').then(mod => mod.AccountComponent),
    data: {
      isModifyMode: true
    }
  },
];
