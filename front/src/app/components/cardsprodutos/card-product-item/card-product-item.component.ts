import { Component, Input, OnInit } from '@angular/core';
import { Produto } from '../../../models/Produto';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/Product.service';

@Component({
  selector: 'app-card-product-item',
  templateUrl: './card-product-item.component.html',
  styleUrls: ['./card-product-item.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CardProductItemComponent implements OnInit {

  @Input()
  produto!: Produto;
  produtos: any;
  productService : ProductService;

  constructor(productService: ProductService ) {
    this.productService = productService;
   }

  ngOnInit() {
    this.produtos = this.productService.getProdutos().subscribe((data => {
      this.produtos = data;
      console.log(this.produtos);
    }));
  }

}
