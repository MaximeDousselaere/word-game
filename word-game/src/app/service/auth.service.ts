import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLoggedIn! : boolean;
  userName : string | null= "";

  constructor(private router : Router, private afAuth : AngularFireAuth, private firestore : AngularFirestore) { 
    this.userLoggedIn = false;

    this.afAuth.onAuthStateChanged((user) => {
      if(user){
        this.userLoggedIn = true;
        this.userName = user.displayName;

      }else{
        this.userLoggedIn = false;
      }
    });
  }

  signupUser(user: any): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
        .then((result) => {
            let emailLower = user.email.toLowerCase();
            if(result.user){
              // ajout des données initiale : 
              this.firestore.collection("users").doc(result.user.uid).set({
                pseudo : user.displayName,
                bio : '',
                avatar : '',
                numberOfGame : 0,
                averageTime : 0.00,
                bestTime : 0.00,
                creationAccount : result.user.metadata.creationTime,
                lastLog : result.user.metadata.lastSignInTime
              });
              // Ajout du pseudo
              result.user.updateProfile({
                displayName: user.displayName
              }).then(function() {
                // Update successful.
            }, function(error : any) {
                console.log("Error : ",error)
            });   
            }
            
            return
        })
        .catch(error => {
            console.log('Auth Service: signup error', error);
            if (error.code)
                return { isValid: false, message: error.message };
            return;
        });
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('Auth Service: loginUser: success');
        })
        .catch(error => {
            console.log('Auth Service: login error...');
            console.log('error code', error.code);
            console.log('error', error);
            if (error.code)
                return { isValid: false, message: error.message };
            return;
        });
  }
  
}
