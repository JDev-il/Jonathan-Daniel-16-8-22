export interface Currency {
  rate: number;
  timestamp: Date;
  from: 'USD' | 'ILS';
  to: 'ILS' | 'USD';
  result: number;
}
