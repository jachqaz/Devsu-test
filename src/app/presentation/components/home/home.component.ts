import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../../common/header/header.component';
import {Account} from '../../../domain/models/account';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  totalResults: number = 0;
  accounts: Account[] = [];
  accountsPage: Account[] = [];
  search: string = '';

  ngOnInit(): void {
    var account: Account;
    account = new Account();
    account.id = "1";
    account.logo = "JG";
    account.name = "B";
    account.description = "description";
    account.releaseDate = "01/01/2000";
    account.restructuringDate = "01/01/2001";
    this.accounts.push(account);
    account = new Account();
    account.id = "1";
    account.logo = "JG";
    account.name = "BA";
    account.description = "description";
    account.releaseDate = "01/01/2000";
    account.restructuringDate = "01/01/2001";
    this.accounts.push(account);
    account = new Account();
    account.id = "1";
    account.logo = "JG";
    account.name = "BAN";
    account.description = "description";
    account.releaseDate = "01/01/2000";
    account.restructuringDate = "01/01/2001";
    this.accounts.push(account);
    account = new Account();
    account.id = "1";
    account.logo = "JG";
    account.name = "BANC";
    account.description = "description";
    account.releaseDate = "01/01/2000";
    account.restructuringDate = "01/01/2001";
    this.accounts.push(account);
    account = new Account();
    account.id = "1";
    account.logo = "JG";
    account.name = "BANCO";
    account.description = "description";
    account.releaseDate = "01/01/2000";
    account.restructuringDate = "01/01/2001";
    this.accounts.push(account);
    account = new Account();
    account.id = "1";
    account.logo = "JG";
    account.name = "BANCOJ";
    account.description = "description";
    account.releaseDate = "01/01/2000";
    account.restructuringDate = "01/01/2001";
    this.accounts.push(account);
    account.id = "1";
    account.logo = "JG";
    account.name = "name";
    account.description = "description";
    account.releaseDate = "01/01/2000";
    account.restructuringDate = "01/01/2001";
    this.accounts.push(account);
    this.accounts.push(account);
    this.accounts.push(account);
    this.accounts.push(account);
    this.accounts.push(account);
    this.accounts.push(account);
    this.accounts.push(account);
    this.accounts.push(account);
    this.accounts.push(account);
    this.accounts.push(account);
    this.accounts.push(account);
    this.accounts.push(account);
    this.accounts.push(account);
    this.accounts.push(account);
    this.accounts.push(account);
    this.accounts.push(account);
    this.accounts.push(account);
    this.accounts.push(account);
    this.accounts.push(account);
  }

  modify(account: Account) {

  }

  delete(account: Account) {

  }

  getAccounts() {
    this.accountsPage = this.accounts.filter(account => account.name.includes(this.search));
    if (this.totalResults != 0) {
      this.accountsPage = this.accountsPage.slice(0, this.totalResults);
    }
    if (this.accountsPage.length != this.accounts.length) {
      return this.accountsPage;
    }
    return this.accounts;
  }

}
