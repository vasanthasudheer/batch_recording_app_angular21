import { Component, inject, OnInit } from '@angular/core';
import { BatchService } from '../../core/guard/services/batch/batch-service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard  implements OnInit{
  ngOnInit(): void {
    
  }
  batchServ=inject(BatchService)
  constructor(){
    this.batchServ.roleSub.subscribe((res:any)=>{
      
    })
    this.batchServ.RoleBehaviorSub.subscribe((res:any)=>{
      
       
  })

}
}
