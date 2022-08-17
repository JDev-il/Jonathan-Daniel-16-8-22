import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {
  Observable,
  retry,
} from 'rxjs';

import { ApiService } from '../../shared/services/api.service';
import { CurrencyService } from './currency.service';


@Injectable()
export class InterceptorService implements HttpInterceptor {

  private routesToCheck = {
    currency: '/exchangerates_data',
  };

  private apiKey = 'LUHju8veOo0l1qG7CIL3fTAjMrufrolu'

  constructor(private apiService: ApiService, private currencyService: CurrencyService) {}

  intercept(
    request: HttpRequest<any | unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any | unknown>> {
    const isCurrencyPath = request.url.includes(this.routesToCheck.currency);

    if(isCurrencyPath){
      request = request.clone({setHeaders: {"apiKey": this.apiKey}})
      return next.handle(request);
    }

    return next.handle(request).pipe(retry(3));
  }
}
