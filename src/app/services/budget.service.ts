import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  calculateWebPrice(nPages: number, nLangs: number): number {
    return nPages*nLangs*30;
  }

  constructor() { }
}
