import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ExchangeCurrencyPipe } from '../core/pipes/exchangeCurrency.pipe';


import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as exported from './main-layout/exporter';
import {
  MAT_RIPPLE_GLOBAL_OPTIONS,
  RippleGlobalOptions,
} from '@angular/material/core';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

const globalRippleConfig: RippleGlobalOptions = {
  disabled: true,
};
registerLocaleData(localeFr, 'fr');


@NgModule({
  declarations: [...exported.components, ExchangeCurrencyPipe],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [MaterialModule, ...exported.components],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'ILS' },
    { provide: LOCALE_ID, useValue: 'en-US' },
    { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
})
export class SharedModule {}
