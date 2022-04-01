import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { words } from '../../assets/words';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss']
})
export class GameViewComponent implements OnInit {

  // Global game vars 
  wordsToWrite : string[] = [];
  wordsHeWrote : string[] = [];
  isWellWritten : boolean[] = [];
  timePerWords : number[] = [];
  timeStartGame! : Date;
  timerIntermediaire! : Date;
  timerIntermediaire2! : Date;
  timeEndGame! : Date;
  timeGame! : number;
  isGameBegin : boolean =  false;
  isGameCurrentlyPlaying : boolean = true;
  isGameSumarry : boolean = false;
  numberOfPossibleWords = words.length;
  input : string = "";
  output : string = "";
  points : number = 0;
  colorOfPoints : string = "primary";
  timer : number = 0;
  interval : any;
  avgTime : number = 0;
  cumulTemps : number = 0;

  constructor(public afAuth : AngularFireAuth) {

  }

  ngOnInit(): void {
    
  }

  /*
  / Procédure qui s'exécute qd on clique sur le btn de début de partie
  */
  makeTheGameBegin(){
    // initialisation des variables globales
    this.isGameBegin = true;
    this.timeStartGame = new Date(); // lancement du timer
    this.timerIntermediaire  = new Date(); // set timer intermediaire
    // Ecriture du premier mot 
    this.changeWord();

    // Gestion du timer affiché
    this.interval = setInterval(() => {
      this.timer = new Date().getTime() - this.timeStartGame.getTime();
    }, 75);

  }

  /*
  / Procédure qui va changer le mot affiché à écrire
  */
  changeWord(){
    this.input = words[Math.floor(Math.random() * this.numberOfPossibleWords)]
    this.wordsToWrite.push(this.input)
  }

  /*
  / Procédure qui s'éxécute qd le giga bg appuie sur entrer sur son clavier
  */
  onKeyDownEnterInput(event : any){
    var output = event.target.value; 
    this.wordsHeWrote.push(output); // on stocke les mots que le boug écrit
    // Si ok : 
    if(output === this.input){
      this.points++; // +1 pt
      this.isWellWritten.push(true);
      this.colorOfPoints = "primary";
    }else{
      this.points = 0; // reset des pts
      this.isWellWritten.push(false);
      this.colorOfPoints = "accent";
    }
    this.changeWord(); // change de mot
    this.timerIntermediaire2 = new Date();
    this.timePerWords.push(this.timerIntermediaire2.getTime() - this.timerIntermediaire.getTime())
    this.timerIntermediaire = new Date();
    this.output = "";// Supprimer ce que le boug a écrit 

    if(this.points==10){ // partie terminée
      clearInterval(this.interval); // on clear le timer
      this.input = "Game over";
      this.timeEndGame = new Date();
      this.isGameCurrentlyPlaying = false; // on désaffiche les input et le btn reset
      this.isGameSumarry = true; // on affiche le résumé
      this.timeGame = this.timeEndGame.getTime() - this.timeStartGame.getTime();
      this.avgTime = this.calculAvgTime();
      this.cumulTemps =  this.calculCumul();
      // On envoi les données vers firebase : 
      // ...
    }
  }
  
  calculAvgTime() : number{
    let cumul = 0;
    for(let elem of this.timePerWords){
      cumul+=elem;
    }
    return cumul/this.timePerWords.length;
  }

  calculCumul() : number {
    let cumul = 0;
    for(let elem of this.timePerWords){
      cumul+=elem;
    }
    return cumul;
  }

  resetGame(){
    this.wordsToWrite = [];
    this.wordsHeWrote  = [];
    this.isWellWritten = [];
    this.timePerWords = [];
    this.timeStartGame = new Date();
    this.timeEndGame= new Date();
    this.timerIntermediaire = new Date();
    this.isGameBegin =  false;
    this.timeGame = 0;
    this.input = "";
    this.output = "";
    this.points = 0;
    this.isGameCurrentlyPlaying = true;
    this.isGameSumarry = false;
    this.colorOfPoints = "primary"
    this.timer = 0;
    clearInterval(this.interval); // on clear le timer
    this.avgTime= 0;
    this.cumulTemps = 0;
  }

  ngOnDestroy(){
    this.resetGame();
  }



}
