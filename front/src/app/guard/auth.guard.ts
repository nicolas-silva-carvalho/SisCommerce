import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AccountService } from '../services/Account.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const accountService = inject(AccountService);
  const user = accountService.IsLogged();
  console.log(user);
  if (!user) {
    return true;
  }

  router.navigate(['/produtos']);
  return false;
};
