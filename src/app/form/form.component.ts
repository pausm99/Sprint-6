import { ProductsService } from './../services/products.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  public products: Product[] = this.productService.products;

  public totalPrice: number = 0;


  formulario = new FormGroup({
    checkbox1: new FormControl(''),
    checkbox2: new FormControl(''),
    checkbox3: new FormControl(''),
  });

  constructor(public productService: ProductsService) {

    this.formulario.valueChanges.subscribe(() => {
      this.updatePrice();
    })
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
