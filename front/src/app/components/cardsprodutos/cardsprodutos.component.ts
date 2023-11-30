import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuLateralComponent } from '../shared/menuLateral/menuLateral.component';
import { AccountService } from '../../services/Account.service';

@Component({
  selector: 'app-cardsprodutos',
  templateUrl: './cardsprodutos.component.html',
  styleUrls: ['./cardsprodutos.component.css'],
  standalone: true,
  imports: [MenuLateralComponent, CommonModule]
})
export class CardsprodutosComponent implements OnInit {

  constructor(public accountService: AccountService) { }

  ngOnInit() {
  }

}
