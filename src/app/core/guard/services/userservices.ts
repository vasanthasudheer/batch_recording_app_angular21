import { Injectable } from '@angular/core';
import { GlobalConstant } from '../../../constant/Global.constant';
import { CandidatesModel } from '../../../model/classes/candidate.Model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Userservices {
  
    loggedUserData:CandidatesModel=new CandidatesModel();
  OnsearchChange:Subject<string>=new Subject<string>();
  // loggedUserData$: BehaviorSubject<CandidatesModel> = 
  //     new BehaviorSubject<CandidatesModel>(this.loggedUserData);
  //cosntructor load we need read data
  constructor() {
 const localData=localStorage.getItem(GlobalConstant.LOCAL_KEY_LOGIN)
   if(localData != null){
    this.loggedUserData=JSON.parse(localData);
   }
  }
}
