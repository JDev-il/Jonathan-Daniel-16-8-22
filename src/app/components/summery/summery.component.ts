import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';

import { OriginalItem } from 'src/app/core/interfaces/Item.interface';
import { SummeryItem } from 'src/app/core/interfaces/Summery.interface';
import { ApiService } from 'src/app/shared/services/api.service';


@Component({
  selector: 'Summery',
  templateUrl: './summery.component.html',
  styleUrls: ['./summery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummeryComponent implements OnInit {
  @Input() displayedColumns!: string[];
  summeryItems!: SummeryItem[];
  dataSource = new MatTableDataSource();
  observedSummeryItems!: Subscription;

  usdIlsSwitch!: boolean;

  constructor(private apiService: ApiService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
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
    this.cd.markForCheck();

    //! FROM HERE....
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

  ngAfterContentChecked() {
    this.dataSource.data = this.summeryItems;
  }
}
