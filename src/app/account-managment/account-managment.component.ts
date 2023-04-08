import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { environment } from 'src/environments/environment';
import { AzerothAPI } from '../shared/api.client.gen';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-account-managment',
  templateUrl: './account-managment.component.html',
  styleUrls: ['./account-managment.component.css']
})
export class AccountManagmentComponent implements OnInit {
  public hidePassword : boolean = true;
  public hideRepeatPassword : boolean = true;

  public password : string = "";
  public confirmPassword : string = "";
  public email : string = "";
  public emailFormGroup: UntypedFormGroup;
  public passwordFormGroup: UntypedFormGroup;

  constructor(private _formBuilder: UntypedFormBuilder, public authService : AuthService, public _azerothClient : AzerothAPI.Client) {
    this.emailFormGroup = this._formBuilder.group({
      emailCtrl: ['', Validators.required],
    });
    this.passwordFormGroup = this._formBuilder.group({
      passwordCtrl: ['', Validators.required],
      confirmPassCtrl: ['', Validators.required],
    });
   }

    public emailHasError = (controlName: string, errorName: string) => {
      return this.emailFormGroup.controls[controlName].hasError(errorName);
    }
  ngOnInit(): void {
  }

}
