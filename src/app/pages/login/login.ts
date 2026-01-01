import { HttpClient } from '@angular/common/http';
import { Component, inject,  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Globalconstat } from '../../constant/Global.constant';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
 
  loginObj: any = {
    "email": " ",
    "password": " "
  }
  http = inject(HttpClient)
  router=inject(Router)
  Onlogin() {
    debugger
    this.http.post("https://feestracking.freeprojectapi.com/api/BatchUser/login", this.loginObj).subscribe({
      next: (result: any) => {
        debugger
        localStorage.setItem(Globalconstat.LOCAL_KEY_LOGIN, JSON.stringify(result.data))
    //  this.router.navigateByUrl('dashboard')
   this.router.navigate(['/dashboard']);

      },
      error: (err => {
        debugger
        alert('err.error.message')
      })


    })
  }
}
