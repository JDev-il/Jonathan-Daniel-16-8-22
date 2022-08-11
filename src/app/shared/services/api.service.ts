import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Store
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
// import * as UI from '../store/actions/ui.actions';

//Interface
import { OriginalItem } from 'src/app/core/interfaces/Item.interface';
import { CurrencyItem } from '../../core/interfaces/Currency.interface';

//RxJS
import { BehaviorSubject, map, take } from 'rxjs';
import { SummeryItem } from 'src/app/core/interfaces/Summery.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  loader!: boolean;
  archivedItems: OriginalItem[] = [];
  itemsData: OriginalItem[] = [];
  summeryItems: SummeryItem[] = [];
  tablesOnlineStores: string[] = [
    'Amazon',
    'eBay',
    'AliExpress',
    'Asos',
    'FarFetch',
    'LYST',
    'End',
  ];

  constructor(private http: HttpClient, private store: Store<fromRoot.State>) {}

  private readonly itemsSource = new BehaviorSubject(<OriginalItem[]>[]);
  private readonly archivedItemsSource = new BehaviorSubject(<OriginalItem[]>[]);
  private readonly summeryItemsSource = new BehaviorSubject(<SummeryItem[]>[]);
  private readonly currencySource = new BehaviorSubject(<CurrencyItem[]>[]);

  readonly items$ = this.itemsSource.asObservable();
  readonly archivedItems$ = this.archivedItemsSource.asObservable();
  readonly summeryItems$ = this.summeryItemsSource.asObservable();
  readonly currency$ = this.currencySource.asObservable();


  private get _apiEndpoints() {
    return {
      productsEndpoint: `https://fakestoreapi.com/products`,
      currenciesEndpoint: `https://api.apilayer.com/exchangerates_data/convert?to=:to&from=:from&amount=:amount`,
    };
  }

  //RxJS SETTERS
  set setCurrencyData(currency: CurrencyItem[]) {
    this.currencySource.next(currency);
  }
  set setArchivedItems(archivedItems: OriginalItem[]) {
    this.archivedItemsSource.next(archivedItems);
  }
  set setTableItems(items: OriginalItem[]) {
    this.itemsSource.next(items);
  }
  set setSummeryItems(items: SummeryItem[]) {
    this.summeryItemsSource.next(items)
  }

  getCurrency(userAmount?: number) {
    const path = this._apiEndpoints.currenciesEndpoint
      .replace(':to', String('ILS'))
      .replace(':from', String('USD'))
      .replace(':amount', String('1'));
    this.http
      .get(path)
      .pipe(take(1), (currency: CurrencyItem | any) => currency)
      .subscribe((result: CurrencyItem | any) => {
        this.setCurrencyData = result;
      });
  }
  getItemsToPurchase() {
    this.loader = true;
    const path = this._apiEndpoints.productsEndpoint;
    this.http
      .get(path)
      .pipe(map((data: any) => data))
      .subscribe(async (items) => {
        this.itemsData = await items.map((item: OriginalItem) => {
          return {
            id: item.id,
            title: item.title,
            store: item.store,
            price: item.price,
            delivery: item.delivery,
            action: item?.action,
          };
        });
        this.summeryItems = await items.map((item: SummeryItem)=>{
          return {
            store: item.store,
            quantity: item?.quantity,
            price: item.price
          }
        })
        this.setSummeryItems = this.summeryItems
        this.setTableItems = this.itemsData;
      });
  }

  addNewItemToDeliveryList(newItem: OriginalItem) {
    const itemToAdd = this.itemsData.filter(
      (prev) => prev.title === newItem.title && prev.price === newItem.price
    );
    if (!itemToAdd.length) {
      let id = { ...this.itemsData[this.itemsData.length - 1] }.id;
      newItem.id = id + 1;
      this.itemsData = [...this.itemsData, newItem];
      this.setTableItems = this.itemsData;
    }
  }

  archiveOrDeliveryItem(item: OriginalItem, isArchived: boolean) {
    let fromWhichList = isArchived ? this.itemsData : this.archivedItems;
    const itemFound = fromWhichList.find((existItem) => {
      return existItem.id === item.id;
    });
    if (itemFound) {
      this.archiveOrReactivateItem(itemFound, isArchived);
    }
  }

  archiveOrReactivateItem(item: OriginalItem, from: boolean) {
    let chosenArray: OriginalItem[] = from
      ? this.itemsData
      : this.archivedItems;
    let indexOfArchive = chosenArray.indexOf(item);
    indexOfArchive > -1 ? chosenArray.splice(indexOfArchive, 1) : '';
    if (from) {
      this.setTableItems = this.itemsData;
      this.archivedItems.push(item);
      this.archivedItems.sort((a, b) => a.id - b.id);
      this.setArchivedItems = this.archivedItems;
    } else {
      this.setArchivedItems = this.archivedItems;
      this.itemsData.push(item);
      this.itemsData.sort((a, b) => a.id - b.id);
      this.setTableItems = this.itemsData;
    }
  }
}
