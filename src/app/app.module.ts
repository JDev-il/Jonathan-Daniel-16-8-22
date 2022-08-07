import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InterceptorService } from './core/services/interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';

import { MaterialModule } from './shared/modules/material.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { CurrencyComponent } from './shared/components/currency/currency.component';
// import { reducers } from './app.reducer';

//->Change Later



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    CurrencyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    // StoreModule.forRoot(reducers)
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'USD' },
    { provide: LOCALE_ID, useValue: 'il' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
