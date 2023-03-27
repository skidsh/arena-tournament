import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { SnackBarService } from '../shared/SnackBar/snack-bar.service';

@Component({
  selector: 'nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public authService: AuthService, public snackBar : SnackBarService) { }

  ngOnInit(): void {
  }

}
