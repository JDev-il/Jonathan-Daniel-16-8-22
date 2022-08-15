import {
  AfterContentChecked,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { concatMap, fromEvent, map, mergeAll, mergeMap, repeat, Subscription, switchMap, take, takeUntil, takeWhile, timer } from 'rxjs';
import { CurrencyService } from 'src/app/core/services/currency.service';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'Currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
})
export class CurrencyComponent implements OnInit {

  currencySubscriber!: Subscription
  @Output() sendCurrencyToComponents = new EventEmitter();
  @Input() currencySymbols!: string[];
  currentSymbol: string = '₪';

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
  }

  chooseCurrencySymbol(option: any) {
    this.currentSymbol = option.value;
    this.currencyService.selectedCurrency = option.value;
  }

  ngAfterContentChecked(){
    this.currencyService.selectedCurrency = this.currentSymbol;
  }
}
