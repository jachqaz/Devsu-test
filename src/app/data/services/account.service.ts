import {Injectable} from '@angular/core';
import {Account} from '../../domain/models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  account: Account = new Account();

  constructor() {
  }
}
