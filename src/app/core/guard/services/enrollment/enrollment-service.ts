import { inject, Injectable } from '@angular/core';
import { enrollmentModel } from '../../../../model/classes/enrollment.Model';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../../model/interfaces/Common.Model';
import { ApiMethodconstant } from '../../../../constant/Global.constant';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BatchModel } from '../../../../model/classes/Batch.Model';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  http = inject(HttpClient)
  
  getAllEnrollments(): Observable<IAPIResponse> {
    return this.http.get<IAPIResponse>(
      environment.API_URL + ApiMethodconstant.GETALLENROLLMENT);
   
  }

  createNewEnrollment(obj: enrollmentModel): Observable<IAPIResponse> {
    debugger;
    return this.http.post<IAPIResponse>(environment.API_URL + ApiMethodconstant.ENROLLMENT, obj);
  }
  
}
