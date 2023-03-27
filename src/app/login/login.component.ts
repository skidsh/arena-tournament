import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { MatButton } from '@angular/material/button'
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loading: boolean = false;
  public invalid: boolean = false;
  public hidePassword: boolean = true;

  @ViewChild('user') usernameE: ElementRef | undefined;
  @ViewChild('pass') passwordE: ElementRef | undefined;
  @ViewChild('login') loginButton: MatButton | undefined;

  constructor(public router: Router, private authService: AuthService) { }

  ngOnInit(): void {

  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      this.loginButton?.ripple.launch({ centered: true })
      this.loginButton?._elementRef.nativeElement.click();
    }
  }

  public auth() {
    this.loading = true;
    this.authService.signIn(this.usernameE?.nativeElement.value, this.passwordE?.nativeElement.value,
      success => {
        this.loading = false;
        if (success) {
          this.router.navigate(["profile"]);
        }
        else {
          this.invalid = true;
        }
      })
  }

}
