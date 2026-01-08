import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CandidatesModel } from '../../../../../model/classes/candidate.Model';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../../../model/interfaces/Common.Model';
import { environment } from '../../../../../../environments/environment';
import { ApiMethodconstant } from '../../../../../constant/Global.constant';
 

@Injectable({
  providedIn: 'root',
})
export class CandidateSerives {
  http =inject(HttpClient)
  
  createNewCandidate(obj:CandidatesModel) :Observable<IAPIResponse>{
      debugger
    return this.http.post<IAPIResponse>(environment.API_URL + ApiMethodconstant. CANDIDATES, obj)
  }
  getAllCandidates() :Observable<IAPIResponse>{
    return this.http.get<IAPIResponse>(environment.API_URL + ApiMethodconstant. CANDIDATES)
  }
  UpdateCandidate(data:any):Observable<IAPIResponse>{
return this.http.put<IAPIResponse>(`${environment.API_URL}${ApiMethodconstant. CANDIDATES}/${data. candidateId}`, data);
}
 
 DeleteCandidate(id:number):Observable<IAPIResponse>{
  return this.http.delete<IAPIResponse> (`${environment.API_URL}${ApiMethodconstant. CANDIDATES}/${id}`)
}
  
}
