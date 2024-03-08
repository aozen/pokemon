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
  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

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
        next: () => {
          this.router.navigate(['/poke/login']);
        },
        error: (err) => {
          console.log(err.error.message);
          alert('Error, try again');
        },
      });
  }
}
