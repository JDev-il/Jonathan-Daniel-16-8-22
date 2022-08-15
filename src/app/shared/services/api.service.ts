import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Store
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

//Interface
import { ItemModel } from 'src/app/core/interfaces/Item.interface';
import { CurrencyItem } from '../../core/interfaces/Currency.interface';

//RxJS
import { BehaviorSubject, map, take } from 'rxjs';
import { SummeryItem } from 'src/app/core/interfaces/Summery.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  showAllDemoItems: any[] = [];
  archivedItems: ItemModel[] = [];
  itemsData: ItemModel[] = [];

  lastItemArchived!: ItemModel;
  lastItemReactivated!: ItemModel;

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

  private readonly itemsSource = new BehaviorSubject(<ItemModel[]>[]);
  private readonly archivedItemsSource = new BehaviorSubject(<ItemModel[]>[]);
  private readonly summeryItemsSource = new BehaviorSubject(<SummeryItem[]>[]);

  readonly items$ = this.itemsSource.asObservable();
  readonly archivedItems$ = this.archivedItemsSource.asObservable();
  readonly summeryItems$ = this.summeryItemsSource.asObservable();

  private get _apiEndpoints() {
    return {
      productsEndpoint: `https://fakestoreapi.com/products`,
    };
  }

  //SETTERS
  set setArchivedItems(archivedItems: ItemModel[]) {
    this.archivedItemsSource.next(archivedItems);
  }
  set setTableItems(items: ItemModel[]) {
    this.itemsSource.next(items);
  }
  set setSummeryItems(items: SummeryItem[]) {
    this.summeryItemsSource.next(items);
  }

  //GETTERS
  get geTableItems() {
    return this.itemsSource.getValue();
  }
  get geArchivedItems() {
    return this.archivedItemsSource.getValue();
  }

  getItemsToPurchaseFromApi() {
    const path = this._apiEndpoints.productsEndpoint;
    this.http
      .get(path)
      .pipe(map((data: any) => data))
      .subscribe(async (items) => {
        this.showAllDemoItems = await items.map((item: ItemModel) => {
          return {
            id: item.id,
            title: item.title,
            store: item.store,
            price: item.price,
            delivery: item.delivery,
            action: item?.action,
            status: item.status,
          };
        });
      });
  }

  addNewItemToDeliveryList(newItem: ItemModel) {
    const itemsDataFilter = this.itemsData.filter(
        (itemData) =>
          itemData.title === newItem.title && itemData.price === newItem.price
      ),
      archivedFound = this.archivedItems?.find(
        (archivedItem) => archivedItem?.id === this.lastItemArchived?.id
      );
    let lastItemDataId = this.itemsData[this.itemsData.length - 1],
      lastArchivedItemId = this.archivedItems[this.archivedItems.length - 1],
      itemsDataLength = this.itemsData.length,
      archivedItemsLength = this.archivedItems.length;

    if (!itemsDataLength && !archivedItemsLength && !itemsDataFilter.length) {
      newItem.id = 1;
      this.itemsData.push(newItem);
    } else if (
      itemsDataLength &&
      !archivedItemsLength &&
      !itemsDataFilter.length
    ) {
      newItem.id = lastItemDataId.id + 1;
      this.itemsData = [...this.itemsData, newItem];
    } else if (archivedItemsLength && !itemsDataLength) {
      newItem.id = lastArchivedItemId.id + 1;
      this.itemsData = [...this.itemsData, newItem];
    } else {
      if (archivedFound && !itemsDataFilter.length) {
        newItem.id = lastArchivedItemId.id + 1;
        this.itemsData = [...this.itemsData, newItem];
      } else {
        newItem.id = lastItemDataId.id + 1;
        this.itemsData = [...this.itemsData, newItem];
      }
    }
    this.setTableItems = this.itemsData;
  }

  archiveOrDeliveryItem(item: ItemModel, isArchived: boolean) {
    let itemsReactivated, itemsArchived;
    if (!isArchived) {
      itemsReactivated = this.itemsData.map((itemData) => {
        this.archivedItems.find((archivedItem) => {
          return itemData.id === archivedItem.id;
        });
      });
      if (itemsReactivated) {
        this.itemsData.indexOf(item) > -1
          ? this.itemsData.splice(this.itemsData.indexOf(item), 1)
          : '';
        this.setTableItems = this.itemsData;
        this.lastItemArchived = item;
        this.archivedItems.push(item);
        this.archivedItems.sort((a, b) => a.id - b.id);
        this.setArchivedItems = this.archivedItems;
      }
    } else {
      itemsArchived = this.archivedItems.map((archivedItem) => {
        this.itemsData.find((itemData) => {
          return archivedItem.id === itemData.id;
        });
      });
      if (itemsArchived) {
        this.archivedItems.indexOf(item) > -1
          ? this.archivedItems.splice(this.archivedItems.indexOf(item), 1)
          : '';
        this.setArchivedItems = this.archivedItems;
        this.lastItemReactivated = item;
        this.itemsData.push(item);
        this.itemsData.sort((a, b) => a.id - b.id);
        this.setTableItems = this.itemsData;
      }
    }
    this.addSummeryItems(item);
  }

  prepareSummeryItems() {
    let items = [...this.itemsData],
      archived = [...this.archivedItems],
      conjoinedItems = items.concat(archived).sort((a, b) => {
        return a.id - b.id;
      }),
      summeryItemsList: SummeryItem[] = [];
    summeryItemsList = conjoinedItems.map((itemsToMap) => {
      if (itemsToMap.store) {
        return {
          store: itemsToMap.store,
          quantity: itemsToMap?.rating?.count,
          price: itemsToMap.price,
        };
      }
      return {
        store: '',
        quantity: itemsToMap?.rating?.count,
        price: 0,
      };
    });
    this.setSummeryItems = summeryItemsList;
  }

  addSummeryItems(itemToAdd: ItemModel) {
    let fromItemToSummery = [].map((item: SummeryItem) => {
      return {
        store: itemToAdd.store,
        quantity: itemToAdd.rating.count,
        price: itemToAdd.price,
      };
    });
    if (fromItemToSummery) {
      this.setSummeryItems = fromItemToSummery;
    }
  }
}
