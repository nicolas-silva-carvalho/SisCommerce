import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavComponent } from './components/shared/nav/nav.component';
import { AccountService } from './services/Account.service';
import { User } from './models/identity/User';
import { CardsprodutosComponent } from './components/cardsprodutos/cardsprodutos.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { MenuLateralComponent } from './components/shared/menuLateral/menuLateral.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, NavComponent, CardsprodutosComponent, FooterComponent, MenuLateralComponent, UserComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  mostrarProdutos: boolean = true;
  mostrarLogin: boolean = false;


  constructor(public accountService: AccountService, public router: Router) {

  }
  title =  'SisE-Commerce';

  ngOnInit(): void {
    this.setCurrentUser();
    if (this.accountService.userValue) {
      this.router.navigateByUrl('/produtos');
    }
  }

  mostrarLoginAsync() {
    this.mostrarProdutos = false;
    this.mostrarLogin = true;
  }

  setCurrentUser(): void {
    let user: User | null;

    if (localStorage.getItem('user'))
      user = JSON.parse(localStorage.getItem('user') ?? '{}');
    else
      user = null

    if (user)
      this.accountService.setCurrentUser(user);
  }
}
