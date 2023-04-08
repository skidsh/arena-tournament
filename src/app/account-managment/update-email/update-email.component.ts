import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { AzerothAPI } from 'src/app/shared/api.client.gen';
import { AuthService } from 'src/app/shared/auth.service';
import { resetForm } from 'src/app/shared/Extension/FormGroup.Extensions';
import { SnackBarService } from 'src/app/shared/SnackBar/snack-bar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.css']
})
export class UpdateEmailComponent implements OnInit {
  public loading : boolean = false;

  public hideCurrPassword : boolean = true;

  public emailFormGroup: UntypedFormGroup;

  public tempPass : string = "";

  constructor(private _formBuilder: UntypedFormBuilder,
     public authService : AuthService,
     public _azerothClient : AzerothAPI.Client,
     public _snackBar : SnackBarService) {
    this.emailFormGroup = this._formBuilder.group({
      emailCtrl: ['', Validators.required],
      currentPasswordCtrl: ['', Validators.required]
    });
   }

   public getCurrPass() : string { return this.emailFormGroup.get("currentPasswordCtrl")?.value }
   public setCurrPass(val : string) { this.emailFormGroup.get("currentPasswordCtrl")?.setValue(val) }
   public getEmail() : string { return this.emailFormGroup.get("emailCtrl")?.value }
   public setEmail(val : string) { this.emailFormGroup.get("emailCtrl")?.setValue(val) }

   public updateEmail() {
    this.loading = true;
    this.tempPass = this.getCurrPass();
    this.DbValidateEmail(validEmail => {
      if (validEmail) {
        this._azerothClient.updateEmail(this.authService.getUser(), btoa(this.getCurrPass()), this.getEmail(), environment.API_KEY)
        .subscribe( result => {
          if (result) {
            this.authService.signIn(this.authService.getUser(), this.tempPass, () => {
              this._snackBar.openSnackBar("Updated email")
              resetForm(this.emailFormGroup)
            });
          }
          else {
            this.emailFormGroup.controls["currentPasswordCtrl"].setErrors({"invalid" : "invalid"})
          }
        },
        error => {
          this.loading = false;
        },
        () => {
          this.loading = false;
        })
      }
      else {
        this.loading = false;
      }
    })
   }

   public DbValidateEmail(callBack: (success: boolean) => void) {
    this._azerothClient.checkEmail(this.getEmail(), environment.API_KEY)
      .subscribe(result => {
      if (result && !this.emailHasError("emailCtrl", "pattern")) {
        this.emailFormGroup.controls["emailCtrl"].setErrors(null);
        callBack(true);
      }
      else {
        this.emailFormGroup.controls["emailCtrl"].setErrors({"used" : "used"});
        callBack(false);
      }
    },
    error => {
      callBack(false);
    },
    () => {

    });
  }

  public emailHasError = (controlName: string, errorName: string) => {
    return this.emailFormGroup.controls[controlName].hasError(errorName);
  }
  ngOnInit(): void {
  }

}
