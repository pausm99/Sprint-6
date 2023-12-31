import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BudgetService } from 'src/app/services/budget.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  webForm: FormGroup;
  @Output() webPrice = new EventEmitter<number[]>();

  constructor(public budgetService: BudgetService, private modalService: NgbModal) {
    this.webForm = new FormGroup({
      nPages: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(50)]),
      nLangs: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(20)]),
    });
  }

  ngOnInit(): void {
    this.webForm.valueChanges.subscribe(() => {
      const nPages = this.webForm.get('nPages')?.value;
      const nLangs = this.webForm.get('nLangs')?.value;

      if (this.webForm.valid) {
        const price = this.budgetService.calculateWebPrice(nPages, nLangs);
        this.webPrice.emit([price, nPages, nLangs]);
      }
    });
  }

  addPages(): void {
    const nPages = this.webForm.get('nPages');

    if (nPages) {
      const actualValue = nPages.value || 1;
      nPages.setValue(actualValue + 1);
    }
  }

  subPages(): void {
    const nPages = this.webForm.get('nPages');

    if (nPages) {
      const actualValue = nPages.value || 1;
      if (actualValue !== 1) nPages.setValue(actualValue - 1);
    }
  }

  addLangs(): void {
    const nLangs = this.webForm.get('nLangs');

    if (nLangs) {
      const actualValue = nLangs.value || 1;
      nLangs.setValue(actualValue + 1);
    }
  }

  subLangs(): void {
    const nLangs = this.webForm.get('nLangs');

    if (nLangs) {
      const actualValue = nLangs.value || 1;
      if (actualValue !== 1) nLangs.setValue(actualValue - 1);
    }
  }

  openModal(type: string): void {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.type = type;
  }

}
