import { HttpInterceptorFn } from '@angular/common/http';
import { User } from '../models/identity/User';
import { inject } from '@angular/core';
import { UserServiceService } from '../services/UserService.service';
import { take } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  let currentUser!: User | null;

  const userService = inject(UserServiceService);
  userService.currentUser$.pipe(take(1)).subscribe(user => {
    currentUser = user

    if (currentUser) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${currentUser.token}`}
      });
    }
  });

  console.log(req.url)

  return next(req);
};
