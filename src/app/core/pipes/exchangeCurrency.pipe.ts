import { Pipe, PipeTransform } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';


@Pipe({name: 'exchangeCurrency'})
export class ExchangeCurrencyPipe implements PipeTransform {

  constructor(private apiService: ApiService){}

  transform(value: number, code: string){
    return value * 2
  }
}
