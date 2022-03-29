import { Component, OnInit } from '@angular/core';
import { words } from '../../assets/words';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss']
})
export class GameViewComponent implements OnInit {

  // Global game vars 
  wordsToWrite : string[] = [];
  timePerWords : number[] = [];
  timeStartGame! : Date;
  timerIntermediaire! : Date;
  timeEndGame! : Date;
  isGameBegin : boolean =  false;
  numberOfWord : number = 0;
  numberOfPossibleWords = words.length;

  constructor() {
  }

  ngOnInit(): void {
  }

  /*
    Fonction qui s'exécute qd on clique sur le btn de début de partie
  */
  makeTheGameBegin(){
    // initialisation des variables globales
    this.isGameBegin = true;
    this.timeStartGame = new Date(); // lancement du timer

    // Initiation de la liste des mots à écrire : 
    for(let i = 0;i<10;i++){
      let randomNumber = Math.floor(Math.random() * this.numberOfPossibleWords); 
      this.wordsToWrite.push(words[randomNumber])
    } 
    console.log(this.wordsToWrite)
  }

  resetGame(){
    this.wordsToWrite = [];
    this.timePerWords = [];
    this.timeStartGame = new Date();
    this.timeEndGame= new Date();
    this.timerIntermediaire = new Date();
    this.isGameBegin =  false;
    this.numberOfWord  = 0;
  }



}
