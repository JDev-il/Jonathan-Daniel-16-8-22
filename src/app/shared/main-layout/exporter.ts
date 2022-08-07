import { PurchasesByStoreComponent } from '../../components/purchases/purchases-by-store/purchases-by-store.component';
import { PurchasesByItemsComponent } from '../../components/purchases/purchases-by-items/purchases-by-items.component';

import { ArchivesComponent } from '../../components/archives/archives.component';
import { DeliveriesComponent } from '../../components/deliveries/deliveries.component';
import { SummeryComponent } from 'src/app/components/summery/summery.component';

import { LoaderComponent } from '../components/loader/loader.component';
import { DialogContent } from '../../components/dialog/dialog.component';


export const components: any[] = [
  PurchasesByItemsComponent,
  PurchasesByStoreComponent,

  ArchivesComponent,
  DeliveriesComponent,
  SummeryComponent,
  LoaderComponent,
  DialogContent
]
