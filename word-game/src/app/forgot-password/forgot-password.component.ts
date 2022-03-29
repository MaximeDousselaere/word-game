import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  resetForm! : FormGroup;
  firebaseErrorMessage : string;

  constructor(private authService : AuthService, private router : Router, private afAuth : AngularFireAuth) {
    this.firebaseErrorMessage="";
    this.resetForm = new FormGroup({
      'email' : new FormControl('', [Validators.required, Validators.email])
    });
   }

  ngOnInit(): void {
  }

  resetMdp(){
    this.afAuth.sendPasswordResetEmail(this.resetForm.value.email)
      .then((result) => {
        this.firebaseErrorMessage = "Check your email.";
        return
    })
    .catch(error => {
        console.log('Auth Service: signup error', error);
        if (error.code)
        this.firebaseErrorMessage = error.message;
        return;
    });
  }

}
