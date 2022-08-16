import {
  Component,
  ViewChild,
  OnInit,
  OnDestroy,
  Input,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ApiService } from 'src/app/shared/services/api.service';

import { ItemModel } from '../../core/interfaces/Item.interface';
import { MatDialog } from '@angular/material/dialog';
import { DialogContent } from '../dialog/dialog.component';

import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

import * as UI from '../../shared/store/actions/ui.actions';
import { CurrencyService } from 'src/app/core/services/currency.service';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'Delivery',
  templateUrl: './deliveries.component.html',
  styleUrls: [
    './deliveries.component.scss',
    '../purchases/purchases-by-items/purchases-by-items.component.scss',
  ],
})
export class DeliveriesComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatSort) sort!: MatSort | null;

  @Output() currentCurrencyEmmiter = new EventEmitter();
  @Input() displayedColumns!: string[];
  @Input() storeNames!: string[];
  @Input() isLoading$!: Observable<boolean>;

  observeditems!: Subscription;

  isDialogOpen!: boolean;
  dataSource = new MatTableDataSource();
  currentStoreName!: string;

  currencySymbol!: string;
  exchangeRate!: number;

  constructor(
    private apiService: ApiService,
    private currencyService: CurrencyService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.observeditems = this.apiService.items$.subscribe((items) => {
      this.dataSource.data = items;
    })
  }

  newItemDialog() {
    if (!this.isDialogOpen) {
      this.isDialogOpen = true;
      const dialogRef = this.dialog.open(DialogContent);
      dialogRef.afterClosed().subscribe(_ => {
        this.isDialogOpen = false;
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  archiveItem(item: ItemModel) {
    item.status = 'A';
    this.apiService.archiveOrDeliveryItem(item, false);
  }

  onChangeStoreName(store: string, element: ItemModel){
    let clonedElement = {...element};
    this.currentStoreName = store;
    this.dataSource.connect().asObservable().forEach((items: any[]) =>{
      items.find(item=>{
        if(item.title === clonedElement.title){
          item.store = this.currentStoreName;
        }
      })
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngAfterContentChecked() {
    this.currencySymbol = this.currencyService.getSelectedCurrency;
    this.exchangeRate = this.currencyService.updatedCurrency?.result;
  }

  ngOnDestroy() {
    this.observeditems.unsubscribe();
  }
}
