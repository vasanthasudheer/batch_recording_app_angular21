import { HttpClient } from '@angular/common/http';
import { Component, inject, signal,  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalConstant } from '../../constant/Global.constant';
import { LoginModel } from '../../model/classes/login.Model';
import { LoginService } from '../../core/guard/services/login/login-service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
 
loginobj: LoginModel = {
  email: '',
  password: ''
};

     
  http = inject(HttpClient)
  router=inject(Router)
  loginsrv=inject(LoginService)
  Onlogin() {
    debugger
    this.loginsrv.login(this.loginobj).subscribe({
      next: (result: any) => {
        debugger
        localStorage.setItem(GlobalConstant.LOCAL_KEY_LOGIN, JSON.stringify(result.data))
        //  this.router.navigateByUrl('dashboard')
        this.router.navigate(['/dashboard']);

      },
      error: (err) => {
        debugger
        alert(err.error.message || 'Login failed')
      }


    })
  }
}