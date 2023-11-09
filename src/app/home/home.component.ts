import { BudgetService } from '../services/budget.service';
import { ProductsService } from '../services/products.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from 'src/app/interfaces/product.interface';

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

  formulario = new FormGroup({
    checkbox1: new FormControl(false),
    checkbox2: new FormControl(false),
    checkbox3: new FormControl(false),
  });

  constructor(public productService: ProductsService, public budgetService: BudgetService) {}

  ngOnInit(): void {
    this.formulario.valueChanges.subscribe(() => {
      this.updatePrice();
      this.webPrice = 0; //reset de value of the webPrice, which was the previously inputed by the user
    });
  }

  captureWebPrice(price: number) {
    this.webPrice = price - this.initialPrice;
  }

  updatePrice() {
    this.totalPrice = 0;
    if (this.formulario.get('checkbox1')?.value) {
      this.totalPrice += this.products[0].price;
    }
    if (this.formulario.get('checkbox2')?.value) {
      this.totalPrice += this.products[1].price;
    }
    if (this.formulario.get('checkbox3')?.value) {
      this.totalPrice += this.products[2].price;
    }
  }
}
