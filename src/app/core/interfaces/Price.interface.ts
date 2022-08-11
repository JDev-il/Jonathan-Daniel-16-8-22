import { CurrencyItem } from './Currency.interface';

export interface Price {
  amount: number;
  converted_from?: CurrencyItem['query']['from'];
  converted_to?: CurrencyItem['query']['to'],
  currency_rate?: CurrencyItem['info']['rate'];
  timestamp?: CurrencyItem['date'];
}
