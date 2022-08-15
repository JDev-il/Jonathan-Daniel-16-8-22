import {
  Component,
  ViewChild,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';

import { ItemModel } from '../../core/interfaces/Item.interface';

import * as fromRoot from '../../app.reducer';
import { CurrencyService } from 'src/app/core/services/currency.service';

@Component({
  selector: 'Archives',
  templateUrl: './archives.component.html',
  styleUrls: [
    './archives.component.scss',
    '../purchases/purchases-by-items/purchases-by-items.component.scss',
  ],
})
export class ArchivesComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatSort) sort!: MatSort | null;
  @Input() displayedColumns!: string[];
  @Input() storeNames!: string[];
  @Input() viewOnlyCurrency!: string;
  @Input() isLoadingArchives!: Observable<any>;

  currencySymbol!: string;
  exchangeRate!: number;
  observedArchivedItems!: Subscription;
  dataSource = new MatTableDataSource();
  currentStoreName!: string;

  constructor(
    private apiService: ApiService,
    private currencyService: CurrencyService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.observedArchivedItems = this.apiService.archivedItems$.subscribe(
      (archived) => {
        this.dataSource.data = archived;
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reactivateItem(item: ItemModel) {
    debugger
    item.status = 'D';
    this.apiService.archiveOrDeliveryItem(item, true);
  }

  onChangeStoreName(store: string, element: ItemModel) {
    let clonedElement = { ...element };
    this.currentStoreName = store;
    this.dataSource
      .connect()
      .asObservable()
      .forEach((items: any[]) => {
        items.find((item) => {
          if (item.title === clonedElement.title)
            item.store = this.currentStoreName;
        });
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngAfterContentChecked(): void {
    this.currencySymbol = this.currencyService.getSelectedCurrency;
  }

  ngOnDestroy() {
    this.observedArchivedItems.unsubscribe();
  }
}
