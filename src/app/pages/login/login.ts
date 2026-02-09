import { HttpClient } from '@angular/common/http';
import { Component, inject, signal,  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalConstant } from '../../constant/Global.constant';
import { LoginModel } from '../../model/classes/login.Model';
import { LoginService } from '../../core/guard/services/login/login-service';
import { NgIf } from '@angular/common';
 

@Component({
  selector: 'app-login',
  imports: [FormsModule,NgIf],
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

  if (!this.loginobj.email) {
    alert('Email is required');
    return;
  }

  if (!this.loginobj.password) {
    alert('Password is required');
    return;
  }

  // Optional: email format check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(this.loginobj.email)) {
    alert('Enter a valid email');
    return;
  }

  this.loginsrv.login(this.loginobj).subscribe({
    next: (result: any) => {
      localStorage.setItem(
        GlobalConstant.LOCAL_KEY_LOGIN,
        JSON.stringify(result.data)
      );
      localStorage.setItem('batchtoken', result.token);
      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      alert(err.error.message || 'Login failed');
    }
  });
}
}