import { BudgetService } from 'src/app/services/budget.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-budgets-list',
  templateUrl: './budgets-list.component.html',
  styleUrls: ['./budgets-list.component.scss']
})
export class BudgetsListComponent {

  constructor(public budgetservice: BudgetService) {}

  public budgets = this.budgetservice.budgetArray;

}
