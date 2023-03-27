import { Component, Input, OnInit } from '@angular/core';
import { AzerothAPI } from '../shared/api.client.gen';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  Object: any;
  @Input() stats: { [key: string]: number; } | undefined = {};
  @Input() arenaTeams?: AzerothAPI.ArenaTeamInfo[] | undefined = undefined;


  constructor() { }

  ngOnInit(): void {
  }

  anyStats(): boolean {
    for (let stat in this.stats) {
      return true;
    }
    return false;
  }

}
