import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../../common/header/header.component';
import {AccountService} from '../../../data/services/account.service';
import {Account} from '../../../domain/models/account';
import {AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Paths} from '../../app.routes';
import {ActivatedRoute, Router} from '@angular/router';
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
export class AccountComponent implements OnInit {
  isModifyMode: boolean = false;
  account: Account = new Account();
  accountForm: FormGroup = this.initFormGroup();

  constructor(private router: Router, private route: ActivatedRoute, private accountService: AccountService) {
    this.account = this.accountService.account;
  }

  ngOnInit(): void {
    this.isModifyMode = this.route.snapshot.data['isModifyMode'];
    if (this.isModifyMode && this.account.id == "") {
      this.router.navigate([Paths.home]);
    }
  }

  reset() {
    if (this.isModifyMode) {
      this.account = this.accountService.account;
    } else {
      this.account = new Account();
    }
    this.accountForm = this.initFormGroup();
  }

  send() {
    console.log(this.account)
    // this.router.navigate([Paths.home]);
  }

  initFormGroup() {
    return new FormGroup({
      id: new FormControl(this.isModifyMode ? this.account.id : ''),
      logo: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      releaseDate: new FormControl('', [
        Validators.required,
        (control: AbstractControl) => {
          {
            const fechaActual = new Date();
            const fechaControl = new Date(control.value);
            fechaControl.setDate(fechaControl.getDate() + 1);
            fechaActual.setHours(fechaControl.getHours(),
              fechaControl.getMinutes(),
              fechaControl.getSeconds(),
              fechaControl.getMilliseconds());
            return fechaControl >= fechaActual ? null : {releaseDateInvalid: true};
          }
        }
      ]),
      restructuringDate: new FormControl('', [
        Validators.required,
        (control: AbstractControl) => {
          {
            const fechaActual = new Date();
            const fechaControl = new Date(control.value);
            fechaControl.setDate(fechaControl.getDate() + 1);
            fechaActual.setFullYear(fechaActual.getFullYear() + 1);
            fechaActual.setHours(fechaControl.getHours(),
              fechaControl.getMinutes(),
              fechaControl.getSeconds(),
              fechaControl.getMilliseconds());
            return fechaControl >= fechaActual ? null : {restructuringDateInvalid: true};
          }
        }
      ]),
    });
  }
}
