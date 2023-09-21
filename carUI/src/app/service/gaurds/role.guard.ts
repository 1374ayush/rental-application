import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => { 
  console.log("role gaurd activated")
  const router=inject(Router)

  const email=localStorage.getItem("email");
  const token=localStorage.getItem("access_token")

  if( token && email=="admin@official.com"){
    return true;
  }else{
    router.navigate(['notauthorised?@abruptuser']);
    return false;
  }
};
