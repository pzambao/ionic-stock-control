/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private products = new Array<Product>();
  private productsSubscription: Subscription;


  constructor(private productsService: ProductService) {
    this.productsSubscription = this.productsService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }
}
