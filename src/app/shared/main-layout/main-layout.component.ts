import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(private _apiService: ApiService) {
  }

  ngOnInit(): void {
  }

}
