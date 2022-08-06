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

import { ApiService } from './api.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  private routesToCheck = {
    products: '/products',
    currency: '/exchangerates_data',
  };

  constructor(private apiService: ApiService) {}

  intercept(
    request: HttpRequest<any | unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any | unknown>> {
    const isProductsPath = request.url.match(this.routesToCheck.products);

    if (isProductsPath) {
      return next.handle(request);
    }
    return next.handle(request).pipe(retry(3));
  }
}
