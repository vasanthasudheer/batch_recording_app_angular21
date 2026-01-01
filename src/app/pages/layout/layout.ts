import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Globalconstat } from '../../constant/Global.constant';
@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
loggedUserData:any;
router=inject(Router)
constructor(){
  const localData=localStorage.getItem(Globalconstat.LOCAL_KEY_LOGIN)
  if(localData != null){
   this. loggedUserData=JSON.parse(localData)
  }
}
OnLogoff(){
  localStorage.removeItem(Globalconstat.LOCAL_KEY_LOGIN)
  this.router.navigate(['login'])
}
}
