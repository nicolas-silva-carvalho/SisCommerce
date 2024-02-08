import { Component, Input, OnInit } from '@angular/core';
import { Produto } from '../../../models/Produto';

@Component({
  selector: 'app-card-product-item',
  templateUrl: './card-product-item.component.html',
  styleUrls: ['./card-product-item.component.css'],
  standalone: true
})
export class CardProductItemComponent implements OnInit {

  @Input()
  produto!: Produto;
  constructor() { }

  ngOnInit() {
  }

}
