import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ApiMethodconstant } from '../../../../constant/Global.constant';
import { ISession } from '../../../../model/interfaces/Session.Module';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../../model/interfaces/Common.Model';

@Injectable({
  providedIn: 'root',
})
export class RecordingService {


  http = inject(HttpClient)

  getAllSessions(): Observable<IAPIResponse> {
    return this.http.get<IAPIResponse>(
      environment.API_URL + ApiMethodconstant.BATCH);

  }
  createNewSession(obj: ISession): Observable<IAPIResponse> {
    return this.http.post<IAPIResponse>(environment.API_URL + ApiMethodconstant.SESSIONS, obj)
  }

  
  updateSession(sessionId: number, obj: ISession): Observable<IAPIResponse> {
    return this.http.put<IAPIResponse>(
      `${environment.API_URL}${ApiMethodconstant.SESSIONS}/${sessionId}`,
      obj
    );
  }

  deleteSession(Id: number): Observable<IAPIResponse> {
    return this.http.delete<IAPIResponse>(environment.API_URL + ApiMethodconstant.SESSIONS + `/${Id}`)
  }

}
