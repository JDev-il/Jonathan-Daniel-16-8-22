import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchases-by-store',
  templateUrl: './purchases-by-store.component.html',
  styleUrls: ['./purchases-by-store.component.scss']
})
export class PurchasesByStoreComponent implements OnInit {
  summeryColumns = ['store', 'quantity', 'price'];
  constructor() { }

  ngOnInit(): void {
  }

}
