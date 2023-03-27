import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AzerothAPI } from '../shared/api.client.gen';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  info : AzerothAPI.RealmDTO = new AzerothAPI.RealmDTO();
  loading: boolean = false;

  constructor(public azerothClient : AzerothAPI.Client) { }

  ngOnInit(): void {
    this.loading = true;
    this.azerothClient.getRealm(environment.API_KEY)
    .subscribe(
      result => {
        this.info = result;
        // this.info.online = true;
      },
      error => {
        this.info.online = false;
        this.info.name = "Arena Tournament"
      },
      () => {
        this.loading = false;
      })
  }

}
