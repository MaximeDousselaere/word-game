import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireService {
  
  constructor(private afAuth : AngularFireAuth, private firestore : AngularFirestore) {
    
  }

  /*
  / Stocker une game sur firestore
  */
  addFirestoreGame(userName : string | null,userUid : string | null,  wordsToWrite : string[], wordsHeWrote : string[], cumulTemps : number, timeEndGame : Date, isWellWritten : boolean[]){
    if(userName == null){
      userName = "Anonyme";
    }
    this.firestore.collection("games").doc(this.firestore.createId()).set({
      userName : userName,
      userUid : userUid,
      wordsToWrite : wordsToWrite,
      wordsHeWrote : wordsHeWrote,
      cumulTemps : cumulTemps,
      timeEndGame : timeEndGame,
      isWellWritten : isWellWritten
    });
  }

}
