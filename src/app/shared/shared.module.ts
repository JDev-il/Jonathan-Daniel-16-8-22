import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';

import * as exported from './main-layout/exporter';
import {
  MAT_RIPPLE_GLOBAL_OPTIONS,
  RippleGlobalOptions,
} from '@angular/material/core';

const globalRippleConfig: RippleGlobalOptions = {
  disabled: true,
};

@NgModule({
  declarations: [...exported.components],
  imports: [CommonModule, MaterialModule],
  exports: [MaterialModule, ...exported.components],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'USD' },
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig },
  ],
})
export class SharedModule {}
