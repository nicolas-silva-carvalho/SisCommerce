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
  imports: [MenuLateralComponent, CommonModule, CardProductItemComponent]
})
export class CardsprodutosComponent implements OnInit {


  constructor( public accountService: AccountService) {

  }

  ngOnInit() {

  }
}
