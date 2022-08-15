import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { SummeryItem } from 'src/app/core/interfaces/Summery.interface';
import { CurrencyService } from 'src/app/core/services/currency.service';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'Summery',
  templateUrl: './summery.component.html',
  styleUrls: ['./summery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummeryComponent implements OnInit {
  @Input() displayedColumns!: string[];
  summeryItems!: SummeryItem[];
  dataSource = new MatTableDataSource();
  observedSummeryItems!: Subscription;

  currencySymbol: string = this.currencyService.selectedCurrency;
  exchangeRate!: number;

  constructor(
    private apiService: ApiService,
    private cd: ChangeDetectorRef,
    private currencyService: CurrencyService
  ) {}

  ngOnInit() {
    this.apiService.prepareSummeryItems();
    this.observedSummeryItems = this.apiService.summeryItems$.subscribe(
      (items) => {
        this.summeryItems = items.map((itemSummery, index) => {
          return {
            store: !itemSummery.store ? items[index].store : itemSummery.store,
            quantity: !itemSummery.quantity ? 1 : itemSummery.quantity,
            price: !itemSummery.price ? items[index].price : itemSummery.price,
          };
        });
      }
    );
  }

  getTotalQuantity() {
    return this.summeryItems
      .map((t) => t.quantity)
      .reduce((acc, value) => acc + value, 0);
  }
  getTotalCost() {
    return this.summeryItems
      .map((t) => t.price)
      .reduce((acc, value) => acc + value, 0);
  }

  numbersToStrings(value: number) {
    return String(value);
  }

  ngAfterContentChecked(): void {
    this.dataSource.data = this.summeryItems;
    this.currencySymbol = this.currencyService.selectedCurrency
    this.cd.markForCheck();
  }
}
