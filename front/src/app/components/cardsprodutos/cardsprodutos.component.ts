import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuLateralComponent } from '../shared/menuLateral/menuLateral.component';
import { AccountService } from '../../services/Account.service';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-cardsprodutos',
  templateUrl: './cardsprodutos.component.html',
  styleUrls: ['./cardsprodutos.component.css'],
  standalone: true,
  imports: [MenuLateralComponent, CommonModule, FooterComponent]
})
export class CardsprodutosComponent implements OnInit {

  constructor(public accountService: AccountService) { }

  ngOnInit() {
  }

}
