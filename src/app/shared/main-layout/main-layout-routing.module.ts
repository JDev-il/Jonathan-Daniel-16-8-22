import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { PurchasesByStoreComponent } from 'src/app/components/purchases/purchases-by-store/purchases-by-store.component';

import { PurchasesByItemsComponent } from 'src/app/components/purchases/purchases-by-items/purchases-by-items.component';
import { ArchivesComponent } from 'src/app/components/archives/archives.component';
import { DeliveriesComponent } from 'src/app/components/deliveries/deliveries.component';
import { SummeryComponent } from 'src/app/components/summery/summery.component';

//Guards
import { CanActivateGuard } from 'src/app/core/auth/guards/can-activate.guard';
import { CanActivateChildGuard } from 'src/app/core/auth/guards/can-activate-child.guard';
import { CanLoadGuard } from 'src/app/core/auth/guards/can-load.guard';



const routes: Routes = [
  {path: '', component: PurchasesByItemsComponent, children: [
    {path: 'delivery', component: DeliveriesComponent},
    {path: 'archives', component: ArchivesComponent},
  ]},
  {path: 'store', component: PurchasesByStoreComponent, children: [
    {path: 'summery', component: SummeryComponent},
  ]},
  {path: '**', redirectTo: '', component: PurchasesByItemsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
