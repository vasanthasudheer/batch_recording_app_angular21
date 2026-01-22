import { HttpClient } from '@angular/common/http';
import {  inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ApiMethodconstant } from '../../../../constant/Global.constant';
import { BatchModel } from '../../../../model/classes/Batch.Model';
import { Observable } from 'rxjs';
import { IAPIResponse  } from '../../../../model/interfaces/Common.Model';

@Injectable({
  providedIn: 'root',
})
export class BatchService {
  http=inject(HttpClient)
  roleSub: any;
  RoleBehaviorSub: any;
  createNewBatch(obj:BatchModel) :Observable<IAPIResponse>{
      debugger
    return this.http.post<IAPIResponse>(environment.API_URL + ApiMethodconstant.BATCH, obj)
  }
  getAllBatches() :Observable<IAPIResponse>{
    return this.http.get<IAPIResponse>(environment.API_URL + ApiMethodconstant.BATCH)
  }
  UpdateBatch(data:any):Observable<IAPIResponse>{
return this.http.put<IAPIResponse>(`${environment.API_URL}${ApiMethodconstant.BATCH}/${data.batchId}`, data);
}
 
 DeleteBatch(id:number):Observable<IAPIResponse>{
  return this.http.delete<IAPIResponse> (`${environment.API_URL}${ApiMethodconstant.BATCH}/${id}`)
}
}
