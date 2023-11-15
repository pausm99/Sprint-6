import { BudgetService } from 'src/app/services/budget.service';
import { Component } from '@angular/core';
import { Budget } from '../interfaces/budget.interface';

@Component({
  selector: 'app-budgets-list',
  templateUrl: './budgets-list.component.html',
  styleUrls: ['./budgets-list.component.scss']
})
export class BudgetsListComponent {

  constructor(public budgetservice: BudgetService) {}

  public budgets = this.budgetservice.budgetArray;

  //orders budgets by descending price
  orderByPrice(): void {
    this.budgets().sort((a: Budget, b: Budget) => b.price - a.price);
  }

  //orders budgets by name alphabetically
  orderByName(): void {
    this.budgets().sort((a: Budget, b: Budget) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
  }

  //orders budgets by date (more recent)
  orderByDate(): void {
    this.budgets().sort((a: Budget, b: Budget) => {
      if (a.date < b.date) return 1;
      else return -1;
    });
  }
}
