import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-view',
  templateUrl: './log-view.component.html',
  styleUrls: ['./log-view.component.scss']
})
export class LogViewComponent implements OnInit {

  signupForm! : FormGroup;
  loginForm! : FormGroup;
  firebaseErrorMessage : string;
  firebaseErrorMessageLogin : string;

  constructor(private authService : AuthService, private router : Router) { 
    this.firebaseErrorMessage = "";
    this.firebaseErrorMessageLogin = "";
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'displayName' : new FormControl('', Validators.required),
      'email' : new FormControl('', [Validators.required, Validators.email]),
      'password' : new FormControl('', Validators.required)
    });

    this.loginForm = new FormGroup({
      'emailLogin' : new FormControl('', [Validators.required, Validators.email]),
      'passwordLogin' : new FormControl('', Validators.required)
    });
  }

  signup()  {
    if(this.signupForm.invalid){
      return;
    }
    this.authService.signupUser(this.signupForm.value).then( (result) => {
      if(result==null){
        this.router.navigate(['/game']);
      }
      else if(result.isValid == false){
        this.firebaseErrorMessage = result.message;
      }
    }).catch(() => {
      
    });
  }
  
  loginUser() {
    if (this.loginForm.invalid)
        return;

    this.authService.loginUser(this.loginForm.value.emailLogin, this.loginForm.value.passwordLogin).then((result) => {
        if (result == null) {                              
            console.log('logging in...');
            this.router.navigate(['/game']);                
        }
        else if (result.isValid == false) {
            console.log('login error', result);
            this.firebaseErrorMessageLogin = result.message;
        }
    });
}

}
