import { AccountService } from './../../services/Account.service';
import { ProductService } from './../../services/Product.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuLateralComponent } from '../shared/menuLateral/menuLateral.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { CardProductItemComponent } from './card-product-item/card-product-item.component';

@Component({
  selector: 'app-cardsprodutos',
  templateUrl: './cardsprodutos.component.html',
  styleUrls: ['./cardsprodutos.component.css'],
  standalone: true,
  imports: [MenuLateralComponent, CommonModule, FooterComponent, CardProductItemComponent]
})
export class CardsprodutosComponent implements OnInit {

  produtos: any;

  constructor(private productService: ProductService, public accountService: AccountService) { }

  ngOnInit() {
    this.produtosAsync();
  }

  public produtosAsync(): void {
    this.produtos = this.productService.getProducts().subscribe((data => {
      this.produtos;
      console.log(this.produtos);
    }));
  }
}
