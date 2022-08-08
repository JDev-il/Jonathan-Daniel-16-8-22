import { Store } from './Store.interface';

export interface Item {
  id?: number;
  title?: string;
  price?: number;
  description?: string;
  isDelivered?: boolean;
  purchase_platform?: Store['name'];
  purchase_date?: Date;
}
