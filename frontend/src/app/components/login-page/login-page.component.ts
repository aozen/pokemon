import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  errorMessages: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  login() {
    this.http
      .post<any>('http://localhost:3000/poke/login', this.loginForm.value)
      .subscribe({
        next: (resp) => {
          localStorage.setItem('token', JSON.stringify(resp.token));
          this.authService.loginUser(this.loginForm.value.email);
          this.router.navigate(['/poke']);
        },
        error: (err) => {
          this.errorMessages = err.error.errors;
        },
      });
  }
}
