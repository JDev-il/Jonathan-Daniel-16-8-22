import { AfterContentChecked, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyItem} from 'src/app/core/interfaces/Currency.interface';
import { ApiService } from 'src/app/shared/services/api.service';
@Component({
  selector: 'Currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
})
export class CurrencyComponent implements OnInit {

  //TODO: Instantiate data from NGRX store!

  @Output() sendCurrencyToComponents = new EventEmitter()
  currencyItem!: CurrencyItem[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    // this.apiService.fetchCurrencyData();
  }

//! currency rates need to update in tables - delivery & store tables NOT HERE!

//     date: "2022-08-09"
// info: {timestamp: 1660043643, rate: 3.31044}
// query: {from: 'USD', to: 'ILS', amount: 1}
// result: 3.31044
// success: true

  ngAfterContentChecked(){
  /*   if(!this.currencyItem){
      this.currencyItem = this.apiService.currencyData;
    } */
  }
}
