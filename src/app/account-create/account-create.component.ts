import { Component, OnInit, ViewChild } from '@angular/core';
import { AzerothAPI } from "../shared/api.client.gen";
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.css']
})
export class AccountCreateComponent implements OnInit {
  readonly _azerothClient : AzerothAPI.Client;

  public loading : boolean = false;
  public complete : boolean = false;
  public errorCreating : boolean = false;

  public hidePassword : boolean = true;
  public hideRepeatPassword : boolean = true;

  public username : string = "";
  public password : string = "";
  public confirmPassword : string = "";
  public email : string = "";

  public usernameFormGroup: FormGroup;
  public emailFormGroup: FormGroup;
  public passwordFormGroup: FormGroup;

  private targetId = 'input0';

  @ViewChild('stepper') private stepper: MatStepper | undefined;

  constructor(azerothClient : AzerothAPI.Client, private _formBuilder: FormBuilder, public authService: AuthService) {
    this._azerothClient = azerothClient;
    this.usernameFormGroup = this._formBuilder.group({
      usernameCtrl: ['', Validators.required],
    });
    this.emailFormGroup = this._formBuilder.group({
      emailCtrl: ['', Validators.required],
    });
    this.passwordFormGroup = this._formBuilder.group({
      passwordCtrl: ['', Validators.required],
      confirmPassCtrl: ['', Validators.required],
    });
   }

  ngOnInit(): void {
  }

  public createAccount()
  {
    this.loading = true;
    this._azerothClient.create(environment.API_KEY, <AzerothAPI.CreateAccountRequest>({username: this.username, encodedPassword: btoa(this.password), email: this.email}))
      .subscribe(result => {
        if (result) {
          this.errorCreating = false;
          this.complete = true;
          this.authService.signIn(this.username, this.password, success => {})
        }
        else {
          this.errorCreating = true;
        }
        this.loading = false;
      },
      error => {
        this.errorCreating = true;
        this.loading = false;
        console.error(error)
      }
    );
  }

  public emailHasError = (controlName: string, errorName: string) => {
    return this.emailFormGroup.controls[controlName].hasError(errorName);
  }
  public userHasError = (controlName: string, errorName: string) => {
    return this.usernameFormGroup.controls[controlName].hasError(errorName);
  }
  public passHasError = (controlName: string, errorName: string) => {
    return this.passwordFormGroup.controls[controlName].hasError(errorName);
  }
  public validatePass() {
    if (this.password != this.confirmPassword) {
      this.passwordFormGroup.controls["passwordCtrl"].setErrors({"mismatch" : "mismatch"})
      this.passwordFormGroup.controls["confirmPassCtrl"].setErrors({"mismatch" : "mismatch"})
    }
    else {
      this.passwordFormGroup.controls["passwordCtrl"].setErrors(null)
      this.passwordFormGroup.controls["confirmPassCtrl"].setErrors(null)
    }
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
  setTargetId(event: any) {
    this.targetId = `input${event.selectedIndex}`;
  }
  public validateUsername()  {
    this.loading = true;
    this._azerothClient.checkUser(this.username, environment.API_KEY)
    .subscribe(result => {
      if (result) {
        this.usernameFormGroup.controls["usernameCtrl"].setErrors(null);
        this.stepper?.next();
      }
      else {
        this.usernameFormGroup.controls["usernameCtrl"].setErrors({"used" : "used"});
        this.unfocus('input0');
      }
    },
    error => {
      this.errorCreating = true;
      this.loading = false;
      console.error(error);
    },
    () => {
      this.loading = false;
    });
  }
  public validateEmail()  {
    this.loading = true;
    this._azerothClient.checkEmail(this.email, environment.API_KEY)
    .subscribe(result => {
      if (result && !this.emailHasError("emailCtrl", "pattern")) {
        this.emailFormGroup.controls["emailCtrl"].setErrors(null);
        this.stepper?.next();
      }
      else {
        this.emailFormGroup.controls["emailCtrl"].setErrors({"used" : "used"});
        this.unfocus('input1');
      }
    },
    error => {
      this.errorCreating = true;
      this.loading = false;
      console.error(error);
    },
    () => {
      this.loading = false;
    });
  }
}
