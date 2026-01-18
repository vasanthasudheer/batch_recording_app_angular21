import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { GlobalConstant } from '../../constant/Global.constant';
@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
loggedUserData:any;
router=inject(Router)
constructor(){
  const localData=localStorage.getItem(GlobalConstant.LOCAL_KEY_LOGIN)
  if(localData != null){
   this. loggedUserData=JSON.parse(localData)
  }
}
OnLogoff(){
  localStorage.removeItem(GlobalConstant.LOCAL_KEY_LOGIN)
  this.router.navigate(['login'])
}
onRoleChanhe(){
  
}
}
