/*  npm commands :
  ng add @angular/material
  npm i @angular/fire
  ng add @angular/fire
*/

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';

// Firebase : 
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';

// Component
import { AppComponent } from './app.component';
import { GameViewComponent } from './game-view/game-view.component';
import { LeaderboardViewComponent } from './leaderboard-view/leaderboard-view.component';
import { MenuViewComponent } from './menu-view/menu-view.component';
import { LogViewComponent } from './log-view/log-view.component';
import { AuthGuard } from './service/auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';



const routes: Routes = [
  { path: 'game', component: GameViewComponent, canActivate : [AuthGuard] },
  { path: 'leaderboard', component: LeaderboardViewComponent, canActivate : [AuthGuard] },
  { path : '', component : LogViewComponent},
  { path : 'forgot-password', component : ForgotPasswordComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    GameViewComponent,
    LeaderboardViewComponent,
    MenuViewComponent,
    LogViewComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forRoot(routes),
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatTooltipModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
