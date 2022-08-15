import { Component, OnInit } from '@angular/core';
import { map, timer } from 'rxjs';

import { ApiService } from 'src/app/shared/services/api.service';

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
