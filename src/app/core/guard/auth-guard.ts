import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Globalconstat } from '../../constant/Global.constant';

export const authGuard: CanActivateFn = (route, state) => {

  const localData=localStorage.getItem(Globalconstat.LOCAL_KEY_LOGIN)
  const router=inject(Router)
  if(localData!=null){
  return true;
  } 
  else{
    router.navigateByUrl('/login') 
    return false
  }
};
