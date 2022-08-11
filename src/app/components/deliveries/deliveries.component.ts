import {
  Component,
  ViewChild,
  OnInit,
  OnDestroy,
  Input,
  AfterViewInit,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ApiService } from 'src/app/shared/services/api.service';

import { OriginalItem } from '../../core/interfaces/Item.interface';
import { MatDialog } from '@angular/material/dialog';
import { DialogContent } from '../dialog/dialog.component';
import { map, Subscription } from 'rxjs';

import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

import * as UI from '../../shared/store/actions/ui.actions';

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
  @Input() displayedColumns!: string[];
  @Input() storeNames!: string[];

  observeditems!: Subscription;

  isLoader!: boolean;
  isDialogOpen!: boolean;
  dataSource = new MatTableDataSource();
  currentStoreName!: string;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.observeditems = this.apiService.items$.subscribe((items) => {
      this.dataSource.data = items;
    });
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

  archiveItem(item: OriginalItem) {
    this.apiService.archiveOrDeliveryItem(item, true);
  }

  onChangeStoreName(store: string, element: OriginalItem){
    let clonedElement = {...element};
    this.currentStoreName = store;
    this.dataSource.connect().asObservable().forEach((items: any[]) =>{
      items.find(item=>{
        if(item.title === clonedElement.title)
          item.store = this.currentStoreName
      })
    })
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.observeditems.unsubscribe();
  }
}
