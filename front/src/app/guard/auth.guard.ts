import { CanActivateFn, Router } from '@angular/router';
import { UserServiceService } from '../services/UserService.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const accountService = inject(UserServiceService);
  const user = accountService.currentUser$;
  if (user != null) {
    return true
  }

  router.navigate(['/user/entrar']);
  return false;
};
