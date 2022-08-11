import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    SharedModule,
  ],
  exports: [
    SharedModule,
  ],
})
export class MainLayoutModule { }
