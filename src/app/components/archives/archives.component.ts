import { Component, ViewChild, OnInit, AfterViewInit, OnDestroy, Input,  } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';

import { OriginalItem } from '../../core/interfaces/Item.interface';

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
  observedArchivedItems!: Subscription;
  dataSource = new MatTableDataSource();
  currentStoreName!: string;

  constructor(private apiService: ApiService) {}

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

  reactivateItem(item: OriginalItem) {
    this.apiService.archiveOrDeliveryItem(item, false);
  }

  onChangeStoreName(store: string, element: OriginalItem){
    let clonedElement = {...element};
    this.currentStoreName = store;
    this.dataSource.connect().asObservable().forEach((items: any[]) =>{
      items.find(item=>{
        if(item.title === clonedElement.title)
          item.store = this.currentStoreName;
      })
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.observedArchivedItems.unsubscribe()
  }
}
