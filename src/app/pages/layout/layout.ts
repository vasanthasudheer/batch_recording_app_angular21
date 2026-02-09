import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { GlobalConstant } from '../../constant/Global.constant'; 
import { AsyncPipe, CommonModule } from '@angular/common';
import { BatchService } from '../../core/guard/services/batch/batch-service';
import { Roles } from '../../core/enum/role.enum';
import { CandidatesModel } from '../../model/classes/candidate.Model';
import { Userservices } from '../../core/guard/services/userservices';
@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink,   CommonModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout implements OnInit{

  router = inject(Router)
  roleEnum = Roles;
 loggedUserData: any ;  
  batchServ = inject(BatchService)
  userser = inject(Userservices)

  constructor() {
      const localData=localStorage.getItem(GlobalConstant.LOCAL_KEY_LOGIN)
      if(localData != null){
        this.loggedUserData=JSON.parse(localData);
      }
        }

        onsearch(event: any){
          const searchText  = event.target.value;
         this.userser.OnsearchChange.next(searchText);
        }

  ngOnInit(): void {
     
    // this.userser.loggedUserData$.subscribe((res: CandidatesModel) => {
      
    // })
     
  }
  OnLogoff() {
    
    localStorage.removeItem(GlobalConstant.LOCAL_KEY_LOGIN)
    this.router.navigate(['login'])
  }
  onRoleChanhe(event: any) {
    this.batchServ.roleSub.next(event.target.value);
    this.batchServ.RoleBehaviorSub.next(event.target.value);
  }

}
