import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/core/services/api.service';
import { ActionsService } from 'src/app/shared/services/ui_actions.service';

import { Item } from '../../core/interfaces/Item.interface';
import {MatDialog} from '@angular/material/dialog';
import { DialogContent } from '../dialog/dialog.component';
import { Observable } from 'rxjs';

import * as fromRoot from '../../app.reducer'
import { Store } from '@ngrx/store';

/*=============================================
=                   EXAMPLE                   =
=============================================*/
//! REPLACE WITH API! //! REPLACE WITH API! //! REPLACE WITH API! //! REPLACE WITH API!
export interface PeriodicElement {
  position: number;
  name: string;
  price: number;
  store: number;
  delivery: string;
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    price: 0,
    store: 1.0079,
    delivery: 'H',
    action: 'Archive',
  },
  {
    position: 2,
    name: 'Helium',
    price: 0,
    store: 4.0026,
    delivery: 'He',
    action: 'Archive',
  },
  {
    position: 3,
    name: 'Lithium',
    price: 0,
    store: 6.941,
    delivery: 'Li',
    action: 'Archive',
  },
  {
    position: 4,
    name: 'Beryllium',
    price: 0,
    store: 9.0122,
    delivery: 'Be',
    action: 'Archive',
  },
  {
    position: 5,
    name: 'Boron',
    price: 0,
    store: 10.811,
    delivery: 'B',
    action: 'Archive',
  },
  {
    position: 6,
    name: 'Carbon',
    price: 0,
    store: 12.0107,
    delivery: 'C',
    action: 'Archive',
  },
  {
    position: 7,
    name: 'Nitrogen',
    price: 0,
    store: 14.0067,
    delivery: 'N',
    action: 'Archive',
  },
  {
    position: 8,
    name: 'Oxygen',
    price: 0,
    store: 15.9994,
    delivery: 'O',
    action: 'Archive',
  },
  {
    position: 9,
    name: 'Fluorine',
    price: 0,
    store: 18.9984,
    delivery: 'F',
    action: 'Archive',
  },
  {
    position: 10,
    name: 'Neon',
    price: 0,
    store: 20.1797,
    delivery: 'Ne',
    action: 'Archive',
  },
];
//! REPLACE WITH API! //! REPLACE WITH API! //! REPLACE WITH API! //! REPLACE WITH API!
/*============  End of EXAMPLE  =============*/

@Component({
  selector: 'Delivery',
  templateUrl: './deliveries.component.html',
  styleUrls: [
    '../purchases/purchases-by-items/purchases-by-items.component.scss',
  ],
})
export class DeliveriesComponent implements OnInit {

  // < Global State
  overLayControl$!: Observable<boolean>


  // > Local State
  isDialogOpen: boolean = false;


  @ViewChild(MatSort) sort!: MatSort | null;

  itemsTable: Item[] = [];

  displayedColumns: string[] = [
    'position',
    'name',
    'store',
    'price',
    'delivery',
    'action',
  ];

  dataSource = new MatTableDataSource(ELEMENT_DATA); //! REPLACE WITH API!

  itemsSource = new MatTableDataSource(this.itemsTable);
  //& change between dataSource & itemsSource


  constructor(
    private apiService: ApiService,
    private actionService: ActionsService,
    public dialog: MatDialog,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(){
    this.overLayControl$ = this.store.select(fromRoot.getOverlay)
    // this.actionService.addNewItemToDeliveryList()
  }

  addNewItem() {
    if(!this.isDialogOpen){
      this.isDialogOpen = true;
      const dialogRef = this.dialog.open(DialogContent);
      dialogRef.afterClosed().subscribe(result => {
        this.isDialogOpen = false;
      });
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


}
