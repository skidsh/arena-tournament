import {  Component } from "@angular/core";
import { environment } from "src/environments/environment";
import { AzerothAPI } from "../shared/api.client.gen";
import { AuthService } from "../shared/auth.service";

@Component({
  selector: 'app-my-characters',
  templateUrl: './my-characters.component.html',
  styleUrls: ['./my-characters.component.css']
})

export class MyCharactersComponent {
  public loading : boolean = false;
  _chars : AzerothAPI.CharResult[] = [];

  constructor(private azerothClient : AzerothAPI.Client, public authService: AuthService) {
    this.loading = true;
    this.azerothClient.searchByAccount(authService.getUser(), environment.API_KEY)
    .subscribe(
      result => {
        this._chars = result.characters as AzerothAPI.CharResult[];
      },
      error => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      })
  }
}
