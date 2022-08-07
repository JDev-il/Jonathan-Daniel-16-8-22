import { Currency } from './Currency.interface';

export interface Price {
  amount: number;
  converted_from: Currency['from'];
  converted_to: Currency['to'],
  currency_rate: Currency['rate'];
  timestamp?: Date;
}
