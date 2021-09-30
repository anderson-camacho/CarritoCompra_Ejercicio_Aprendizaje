import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { tap } from 'rxjs/operators';
import { Product } from './interfaces/product.interface';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  template: `<section class="products">
              <app-product (addToCardClick)="addToCard($event)" [product] = "product" *ngFor="let product of products">
              </app-product>
            </section>`,
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products!: Product[];

  constructor(private productoSVC: ProductsService, private shoppingCartSvc: ShoppingCartService) { }

  ngOnInit(): void {
    this.productoSVC.getProducts()
      .pipe(
        tap((products: Product[]) => this.products = products)
      ).subscribe();
  }

  addToCard(product: Product): void {
    console.log('Add to cart', product);
    this.shoppingCartSvc.updateCart(product);
  }

}
