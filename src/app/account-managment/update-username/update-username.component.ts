import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { resetForm } from 'src/app/shared/Extension/FormGroup.Extensions';
import { SnackBarService } from 'src/app/shared/SnackBar/snack-bar.service';
import { environment } from 'src/environments/environment';
import { AzerothAPI } from '../../shared/api.client.gen';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-update-username',
  templateUrl: './update-username.component.html',
  styleUrls: ['./update-username.component.css']
})
export class UpdateUsernameComponent implements OnInit {
  public loading : boolean = false;

  public usernameFormGroup: FormGroup;

  public hidePassword : boolean = true;

  public tempUser : string = "";
  public tempPass : string = "";

  private targetId = 'update-username-input0';

  constructor(private _formBuilder: FormBuilder,
    public authService : AuthService,
    public _azerothClient : AzerothAPI.Client,
    private _snackService : SnackBarService) {
    this.usernameFormGroup = this._formBuilder.group({
      usernameCtrl: ['', Validators.required],
      passwordCtrl: ['', Validators.required],
    });
  }

  public getUsername() : string { return this.usernameFormGroup.get("usernameCtrl")?.value }
  public getPass() : string { return this.usernameFormGroup.get("passwordCtrl")?.value }
  public setUsername(val : string) { this.usernameFormGroup.get("usernameCtrl")?.setValue(val) }
  public setPass(val : string) { this.usernameFormGroup.get("passwordCtrl")?.setValue(val) }

  public userHasError = (controlName: string, errorName: string) => {
    return this.usernameFormGroup.controls[controlName].hasError(errorName);
  }

  public validateUsername()  {
    if (this.usernameFormGroup.get("usernameCtrl")?.errors) { return }
    if (this.usernameFormGroup.get("passwordCtrl")?.errors) { return }

    this.loading = true;
    this._azerothClient.checkUser(this.usernameFormGroup.get("usernameCtrl")?.value, environment.API_KEY)
    .subscribe(result => {
      if (result) {
        this.usernameFormGroup.controls["usernameCtrl"].setErrors(null);
        this.loading = true;
        this.tempUser = this.getUsername();
        this.tempPass = this.getPass();
        this._azerothClient.updateUsername(this.authService.getUser(), this.tempUser, btoa(this.tempPass), environment.API_KEY)
        .subscribe(result => {
          if (result) {
            this.authService.signIn(this.tempUser, this.tempPass, () => {
              this.tempPass = "";
              this.tempUser = "";
              resetForm(this.usernameFormGroup)
              this._snackService.openSnackBar("Username updated")
            });
          }
          else {
            this.usernameFormGroup.controls["passwordCtrl"].setErrors({"invalid" : "invalid"});
          }
        },
        error => {
          this.loading = false;
        },
        () => {
          this.loading = false;
        });
      }
      else {
        this.usernameFormGroup.controls["usernameCtrl"].setErrors({"used" : "used"});
        this.unfocus('input0');
      }
    },
    error => {
      //this.errorCreating = true;
      this.loading = false;
      console.error(error);
    },
    () => {
      this.loading = false;
    });
  }



  setTargetId(event: any) {
    this.targetId = `input${event.selectedIndex}`;
  }
  setFocus() {
    const targetElem = document.getElementById(this.targetId);
    if (targetElem != null) {
      targetElem.focus();
    }
  }
  unfocus(id : string) {
    const targetElem = document.getElementById(id);
    if (targetElem != null) {
      targetElem.blur();
    }
  }

  ngOnInit(): void {
  }

}
