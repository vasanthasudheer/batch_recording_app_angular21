import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { GlobalConstant } from '../../../../constant/Global.constant';
import { LoginModel } from '../../../../model/classes/login.Model';

import { Observable } from 'rxjs';
import { ILoginResponse } from '../../../../model/interfaces/LoginResponse.Model';
import { IAPIResponse } from '../../../../model/interfaces/Common.Model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http = inject(HttpClient);
  login(obj: LoginModel): Observable <IAPIResponse> {
    return this.http.post<IAPIResponse>(
      environment.API_URL + GlobalConstant.LOCAL_KEY_LOGIN +'/login'  ,obj);
     
  }
}
                                  