import { Budget } from './../interfaces/budget.interface';
import { BudgetService } from '../services/budget.service';
import { ProductsService } from '../services/products.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/product.interface';
import { CustomValidators } from '../validators/custom.validator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public products: Product[] = this.productService.products;
  public totalPrice: number = 0;

  public webPrice: number = 0;
  public initialPrice: number = this.budgetService.calculateWebPrice(1, 1);
  public webConfig: number[] = [1, 1];

  public checks: boolean[] = [false];

  public formSent: boolean = false;

  form1 = new FormGroup({
    checkbox1: new FormControl(false),
    checkbox2: new FormControl(false),
    checkbox3: new FormControl(false),
  }, { validators: CustomValidators.minOneChecked });

  form2 = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    phoneNumber: new FormControl('', [Validators.required, CustomValidators.customPhone]),
    email: new FormControl('', [Validators.required, CustomValidators.emailValidator])
  });

  constructor(public productService: ProductsService, public budgetService: BudgetService) {}

  ngOnInit(): void {
    this.form1.valueChanges.subscribe(() => {
      this.updatePrice();
    });
  }

  captureWebPrice(priceAndOptions: number[]) {
    this.totalPrice -= this.webPrice; //reset the previous webPrice
    this.webPrice = priceAndOptions[0] - this.initialPrice;
    this.totalPrice += this.webPrice;
    [this.webConfig[0], this.webConfig[1]] = priceAndOptions.slice(1, 3);
  }

  updatePrice() {
    this.totalPrice = 0;
    if (this.form1.get('checkbox1')?.value) {
      this.totalPrice += this.products[0].price;
      this.checks[0] = true;
    }
    else this.checks[0] = false;
    if (this.form1.get('checkbox2')?.value) {
      this.totalPrice += this.products[1].price;
      this.checks[1] = true;
    }
    else this.checks[1] = false;
    if (this.form1.get('checkbox3')?.value) {
      this.totalPrice += this.products[2].price;
      this.checks[2] = true;
    }
    else {
      this.checks[2] = false;
      this.webPrice = 0;
    }
  }

  applyBudget(): void {

    this.formSent = true;

    let servicesForm: string[] = this.productService.products.filter((product, index) => this.checks[index])
                                                              .map(product => (product.title + (product.title === 'Web' ? this.getFormattedWebConfig() : '')));
    let priceForm = this.totalPrice;

    let phone: string = this.form2.get('phoneNumber')!.value?.toString() || '';
    const chunks = phone.match(/.{1,3}/g);
    // Unir los grupos con un espacio en blanco entre ellos
    phone = chunks ? chunks.join(' ') : '';

    let budget: Budget = {
      name: this.form2.get('name')!.value || '',
      email: this.form2.get('email')!.value || '',
      phoneNumber: phone,
      services: servicesForm,
      price: priceForm
    }

    if (this.form2.valid) {
      this.budgetService.budgetArray.update(budgets => [...budgets, budget]);
      setTimeout(() => {
        this.form2.reset();
        this.form1.reset();
      }, 200);
      this.formSent = false;
    }

  }

  getFormattedWebConfig(): string {
    const config = {
      single: ['pàgina', 'llenguatge'],
      multi: ['pàgines', 'llenguates']
    };

    let pages: number = this.webConfig[0];
    let langs: number = this.webConfig[1];

    let first: string = ' ';
    let second: string = ' ';

    if (pages > 1) first += config.multi[0] + ', ';
    else first += config.single[0] + ', ';

    if (langs > 1) second += config.multi[1];
    else second += config.single[1];

    return ' (' + pages + first + langs + second + ')';
  }

  validateName() {
    return this.form2.get('name')!.touched && (this.form2.get('name')!.hasError('required') || this.form2.get('name')!.hasError('maxlength'));
  }

  validatePhoneNumber() {
    return this.form2.get('phoneNumber')!.touched && (this.form2.get('phoneNumber')!.hasError('required') || this.form2.get('phoneNumber')!.hasError('invalidPhone'));
  }

  validateEmail() {
    return this.form2.get('email')!.touched && (this.form2.get('email')!.hasError('required') || this.form2.get('email')!.hasError('invalidEmail'));
  }

}
