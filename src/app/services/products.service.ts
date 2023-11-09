import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public products: Product[] = [
    {
      title: 'Seo',
      description: "Millora la teva visibilitat online",
      price: 300
    },
    {
      title: 'Ads',
      description: "Impulsa el teu èxit amb publicitat",
      price: 400
    },
    {
      title: 'Web',
      description: "Programació d'una web responsive completa",
      price: 530
    }
  ]

}
