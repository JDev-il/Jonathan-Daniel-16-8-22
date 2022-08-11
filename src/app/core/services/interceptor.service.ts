import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
  HttpHeaderResponse,
  HttpEventType,
  HttpHeaders,
  HttpResponseBase,
  HttpClient,
} from '@angular/common/http';
import {
  Observable,
  throwError,
  of,
  tap,
  switchMap,
  retry,
  catchError,
  delayWhen,
  map,
} from 'rxjs';

import { ApiService } from '../../shared/services/api.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  private routesToCheck = {
    products: '/products',
    currency: '/exchangerates_data',
  };

  private apiKey = 'Xk3PfHIgkBmxdOW1Kt5g3junXdyU9B3X'

  constructor(private apiService: ApiService) {}

  intercept(
    request: HttpRequest<any | unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any | unknown>> {
    const isCurrencyPath = request.url.includes("exchangerates_data");

    if(isCurrencyPath){
      request = request.clone({setHeaders: {"apiKey": this.apiKey}})
      return next.handle(request)
    }

    return next.handle(request).pipe(retry(3));
  }
}
