import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'Loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  loadingState: boolean = true;

  constructor(private apiService: ApiService, private uiService: UiService) {}

  ngOnInit(): void {
  }

}
