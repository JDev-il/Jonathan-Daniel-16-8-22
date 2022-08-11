import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'Loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  loader: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loader = this.apiService.loader
  }

  ngAfterContentInit(): void {

    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.

  }

}
