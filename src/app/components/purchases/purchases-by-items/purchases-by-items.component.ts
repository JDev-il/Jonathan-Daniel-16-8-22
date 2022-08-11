import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-purchases-by-items',
  templateUrl: './purchases-by-items.component.html',
  styleUrls: ['./purchases-by-items.component.scss'],
})
export class PurchasesByItemsComponent implements OnInit {
  tableColumns = ['id', 'title', 'store', 'price', 'delivery', 'action'];
  tablesOnlineStores!: string[];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.tablesOnlineStores = this.apiService.tablesOnlineStores;
  }
}
