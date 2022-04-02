import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor(private afAuth : AngularFireAuth, private firestore : AngularFirestore) { }

  /*
  / Stocker une game sur firestore
  */
  addFirestoreGame(userName : string | null, wordsToWrite : string[], wordsHeWrote : string[], cumulTemps : number, timeEndGame : Date){
    if(userName == null){
      userName = "Anonyme";
    }
    this.firestore.collection("games").doc(this.firestore.createId()).set({
      userName : userName,
      wordsToWrite : wordsToWrite,
      wordsHeWrote : wordsHeWrote,
      cumulTemps : cumulTemps,
      timeEndGame : timeEndGame
    });

  }

}
