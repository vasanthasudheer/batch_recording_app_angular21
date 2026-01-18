import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GlobalConstant } from '../../constant/Global.constant';

export const authGuard: CanActivateFn = (route, state) => {

  const localData=localStorage.getItem(GlobalConstant.LOCAL_KEY_LOGIN)
  const router=inject(Router)
  if(localData!=null){
  return true;
  } 
  else{
    router.navigateByUrl('/login') 
    return false
  }
};
