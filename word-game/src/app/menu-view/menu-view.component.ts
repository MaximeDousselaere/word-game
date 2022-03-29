import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-menu-view',
  templateUrl: './menu-view.component.html',
  styleUrls: ['./menu-view.component.scss']
})
export class MenuViewComponent implements OnInit {

  user$ = this.afAuth.user;

  constructor(public afAuth : AngularFireAuth) {}

  ngOnInit(): void {
    
  }

  // Déconnecte le joueur
  logout() : void {
    this.afAuth.signOut();
  }

}
