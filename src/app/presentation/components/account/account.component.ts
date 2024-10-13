import {Component} from '@angular/core';
import {HeaderComponent} from '../../common/header/header.component';
import {AccountService} from '../../../data/services/account.service';
import {Account} from '../../../domain/models/account';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Paths} from '../../app.routes';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  account: Account = new Account();
  accountForm: FormGroup = this.initFormGroup();

  constructor(private router: Router, private accountService: AccountService) {
    this.account = this.accountService.account;
  }

  reset() {
    this.account = new Account();
    this.accountForm = this.initFormGroup();
  }

  send() {
    console.log(this.account)
    this.router.navigate([Paths.home]);
  }

  initFormGroup() {
    return new FormGroup({
      id: new FormControl(''),
      logo: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      releaseDate: new FormControl(''),
      restructuringDate: new FormControl(''),
    });
  }
}
