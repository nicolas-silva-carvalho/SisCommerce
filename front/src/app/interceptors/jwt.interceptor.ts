import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../services/Account.service';
import { environment } from '../environment/environment';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  // let currentUser!: User | null;

  // const userService = inject(AccountService);
  // userService.currentUser$.pipe(take(1)).subscribe(user => {
  //   currentUser = user

  //   if (currentUser) {
  //     req = req.clone({
  //       setHeaders: { Authorization: `Bearer ${currentUser.token}`}
  //     });
  //   }
  // });

  const accountService = inject(AccountService);
  const user = accountService.userValue;
  const isLoggedIn = user?.token;
  const isApiUrl = req.url.startsWith(environment.apiURL);

  if (isLoggedIn && isApiUrl) {
    req = req.clone({
        setHeaders: { Authorization: `Bearer ${user.token}` }
    });
}

  console.log(req.url)

  return next(req);
};
