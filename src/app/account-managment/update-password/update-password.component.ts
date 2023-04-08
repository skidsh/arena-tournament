import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { AzerothAPI } from 'src/app/shared/api.client.gen';
import { AuthService } from 'src/app/shared/auth.service';
import { resetForm } from 'src/app/shared/Extension/FormGroup.Extensions';
import { SnackBarService } from 'src/app/shared/SnackBar/snack-bar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  public loading : boolean = false;

  public hidePassword : boolean = true;
  public hideRepeatPassword : boolean = true;
  public hideCurrPassword : boolean = true;

  public passwordFormGroup: UntypedFormGroup;

  constructor(private _formBuilder: UntypedFormBuilder,
     public authService : AuthService,
     public _azerothClient : AzerothAPI.Client,
     public _snackBar : SnackBarService) {
    this.passwordFormGroup = this._formBuilder.group({
      passwordCtrl: ['', Validators.required],
      confirmPassCtrl: ['', Validators.required],
      currentPasswordCtrl: ['', Validators.required]
    });
   }

   public getRePass() : string { return this.passwordFormGroup.get("confirmPassCtrl")?.value }
   public getPass() : string { return this.passwordFormGroup.get("passwordCtrl")?.value }
   public getCurrPass() : string { return this.passwordFormGroup.get("currentPasswordCtrl")?.value }
   public setCurrPass(val : string) { this.passwordFormGroup.get("currentPasswordCtrl")?.setValue(val) }
   public setPass(val : string) { this.passwordFormGroup.get("passwordCtrl")?.setValue(val) }
   public setRePass(val : string) { this.passwordFormGroup.get("confirmPassCtrl")?.setValue(val) }

   public updatePassword() {
     this.loading = true;
    this._azerothClient.updatePassword(this.authService.getUser(), btoa(this.getCurrPass()), btoa(this.getPass()), environment.API_KEY)
    .subscribe( result => {
      if (result) {
        this._snackBar.openSnackBar("Updated password")
        resetForm(this.passwordFormGroup)
      }
      else {
        this.passwordFormGroup.controls["currentPasswordCtrl"].setErrors({"invalid" : "invalid"})
      }
    },
    error => {
      this.loading = false;
    },
    () => {
      this.loading = false;
    })
   }

   public validatePass() {
    if ((this.passwordFormGroup.dirty && !this.getPass()) ||
        (this.passwordFormGroup.dirty && !this.getRePass()) ||
        (this.getPass() != this.getRePass())) {
      this.passwordFormGroup.controls["passwordCtrl"].setErrors({"mismatch" : "mismatch"})
      this.passwordFormGroup.controls["confirmPassCtrl"].setErrors({"mismatch" : "mismatch"})
      return;
    }

    this.passwordFormGroup.controls["passwordCtrl"].setErrors(null)
    this.passwordFormGroup.controls["confirmPassCtrl"].setErrors(null)
  }

  public passHasError = (controlName: string, errorName: string) => {
    return this.passwordFormGroup.controls[controlName].hasError(errorName);
  }
  ngOnInit(): void {
  }

}
