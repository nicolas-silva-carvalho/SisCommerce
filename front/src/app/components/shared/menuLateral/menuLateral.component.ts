import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/Account.service';

@Component({
  selector: 'app-menuLateral',
  templateUrl: './menuLateral.component.html',
  styleUrls: ['./menuLateral.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class MenuLateralComponent implements OnInit {

  constructor(public accoutService: AccountService, private router: Router) { }

  ngOnInit() {
  }

  logout(): void {
    this.accoutService.logout();
    this.router.navigateByUrl('/user/entrar');
  }

}
