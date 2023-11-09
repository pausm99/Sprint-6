import { BudgetService } from 'src/app/services/budget.service';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() type!: string;
  public title: string = '';
  public description: string = '';

  constructor(public activeModal: NgbActiveModal, public budgetService: BudgetService) {}

  getTypeTitle(): string {
    if (this.type === 'pages') return this.budgetService.helpTextsPages[0];
    else if (this.type === 'langs') return this.budgetService.helpTextsLangs[0];
    return this.title;
  }

  getTypeDescription(): string {
    if (this.type === 'pages') return this.budgetService.helpTextsPages[1];
    else if (this.type === 'langs') return this.budgetService.helpTextsLangs[1];
    return this.description;
  }
}
