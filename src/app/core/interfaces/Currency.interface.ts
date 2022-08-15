export type Currency = 'ILS' | 'USD';
export interface CurrencyItem {
  date: Date,
  info: {timestamp: Date, rate: number}
  query: {from: string, to: string, amount: number}
  result: number
  success: boolean
  synmbols?: Currency
}
