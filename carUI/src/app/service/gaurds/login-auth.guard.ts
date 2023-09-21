import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginAuthGuard: CanActivateFn = (route, state) => {
  const token =localStorage.getItem("access_token");
  const email=localStorage.getItem("email")
  const router=inject(Router);
  if(token && email!="admin@official.com"){
    return true;
  }else{
    router.navigate(['login'])
    return false;
  }
};
