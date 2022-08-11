import { Store } from './Store.interface';

export interface TableItem {
  id: number,
  title: string,
  store: string,
  delivery: Date,
  price: number,
  action?: string
}


export interface OriginalItem {
  category?: string,
  description?: string,
  id: number,
  image?: string,
  price: number,
  rating: {rate: number, count: number},
  title: string,
  delivery: Date,
  action?: string,
  store: string,
}
