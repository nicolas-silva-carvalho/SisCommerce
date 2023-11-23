import { Routes } from '@angular/router';
import { RegistrarComponent } from './components/user/registrar/registrar.component';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      {path: 'registrar', component: RegistrarComponent}
    ]
  }
];
