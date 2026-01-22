import { inject, Injectable } from '@angular/core';
import { enrollmentModel } from '../../../../model/classes/enrollment.Model';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../../model/interfaces/Common.Model';
import { ApiMethodconstant, Method_Names } from '../../../../constant/Global.constant';
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
      environment.API_URL +
      ApiMethodconstant.ENROLLMENT + '/' +
      Method_Names.ENROLLMENT.GETALLENROLLMENT
    );

  }

  createNewEnrollment(obj: enrollmentModel): Observable<IAPIResponse> {
    debugger;
    return this.http.post<IAPIResponse>(environment.API_URL + ApiMethodconstant.ENROLLMENT, obj);
  }

  updateNewEnrollment(data: any): Observable<IAPIResponse> {
    return this.http.put<IAPIResponse>(
      `${environment.API_URL}${ApiMethodconstant.ENROLLMENT}/${data.enrollmentId}`,
      data
    );
  }

  deleteNewEnrollment(enrollmentId: number): Observable<IAPIResponse> {
    return this.http.delete<IAPIResponse>(environment.API_URL + ApiMethodconstant.ENROLLMENT + '/' + enrollmentId)
  }


  //for getting enrollment by candidate id

  getEnrollmentsBatchByCandidateId(Id: number): Observable<IAPIResponse> {
    return this.http.get<IAPIResponse>(environment.API_URL + ApiMethodconstant.ENROLLMENT +
      '/' + Method_Names.ENROLLMENT.GET_ENROLLMENT_BY_CANDIDATE + '/' + Id)

  }
 getSessionRecordingbyBatchId(Id: number): Observable<IAPIResponse> {
    return this.http.get<IAPIResponse>(environment.API_URL + ApiMethodconstant.SESSIONS + 
      '/' + Method_Names.SESSIONS.GET_SESSIONS_BY_BATCHID + '/' + Id)
  }
 
}