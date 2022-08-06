import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'Currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
})
export class CurrencyComponent implements OnInit {

  //TODO: Instantiate data from NGRX store!

  currencySubscription!: Subscription
  currencyItem: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    //! SHOULD BE IMPORTED FROM NGRX STORE!
    this.currencySubscription = this.apiService.currency$.subscribe(currencyItem=>{
      this.currencyItem = currencyItem
    })
  }

}
