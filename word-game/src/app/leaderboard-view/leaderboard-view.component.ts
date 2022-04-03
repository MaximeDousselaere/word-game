import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaderboard-view',
  templateUrl: './leaderboard-view.component.html',
  styleUrls: ['./leaderboard-view.component.scss']
})
export class LeaderboardViewComponent implements OnInit {

  classement : any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
