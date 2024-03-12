import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent {
  errorMessages: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {
    if(this.authService.isLoggedIn) {
      this.router.navigate(['/poke']);
    }
  }

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onSubmit() {
    this.http
      .post<any>('http://localhost:3000/poke/register', this.signUpForm.value)
      .subscribe({
        next: (resp) => {
          if(resp.message !== 'OK') {
            this.errorMessages = [resp.message];
            return;
          }
          this.router.navigate(['/poke/login']);
        },
        error: (err) => {
          this.errorMessages = err.error.errors;
        },
      });
  }
}
