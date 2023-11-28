import { Routes } from '@angular/router';
import { RegistrarComponent } from './components/user/registrar/registrar.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { CardsprodutosComponent } from './components/cardsprodutos/cardsprodutos.component';

export const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      {path: 'registrar', component: RegistrarComponent},
      {path: 'entrar', component: LoginComponent}
    ]
  },
  { path: 'produtos', component: CardsprodutosComponent}
];
