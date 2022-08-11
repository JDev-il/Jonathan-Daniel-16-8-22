import { Component } from '@angular/core';
import { ApiService } from './shared/services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(private apiService: ApiService){
    this.apiService.getItemsToPurchase();
  }
  title = 'shopping-tracking-list';
}
