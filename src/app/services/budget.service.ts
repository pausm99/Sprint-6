import { Injectable, signal } from '@angular/core';
import { Budget } from '../interfaces/budget.interface';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  public budgetArray = signal<Budget[]>([]);

  public helpTextsPages: string[] = [
    'Número de pàgines',
    'Afegeix el número de pàgines que tindrà el teu projecte. El cost total del servei depèn del número de pàgines.'
  ];
  public helpTextsLangs: string[] = [
    'Número de llenguatges',
    'Afegeix el número de llenguatges que tindrà el teu projecte. El cost de cada llenguatge és de 30€.'
  ];

  calculateWebPrice(nPages: number, nLangs: number): number {
    return nPages*nLangs*30;
  }

  constructor() { }
}
