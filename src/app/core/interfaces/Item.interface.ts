export interface ItemModel {
  category?: string;
  description?: string;
  id: number;
  image?: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
  delivery: Date;
  action?: string;
  store: string;
  status?: string;
}
