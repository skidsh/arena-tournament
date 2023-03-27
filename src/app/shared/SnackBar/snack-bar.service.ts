import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(public _snackBar : MatSnackBar, public clipboard : Clipboard) { }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000
    })
  }

  openSnackBarAndCopy(message: string, action: string) {
    this._snackBar.open(message, 'Copy', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000
    }).onAction().subscribe(t => {
      this.clipboard.copy(message);
    });
  }
}
