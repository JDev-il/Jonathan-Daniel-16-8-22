import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/core/services/currency.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'Header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currencySymbolsList: string[] = ['₪', '$'];

  constructor(private apiService: ApiService, private currecnyService: CurrencyService) {}

  ngOnInit() {
  }
}
