import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  constructor(private router: Router, private http: HttpClient) {
    console.log("CONSTRUCTOR")
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onSubmit() {
    console.log(this.loginForm.value);

    this.http
      .post<any>('http://localhost:3000/poke/login', this.loginForm.value)
      .subscribe({
        next: (resp) => {
          console.log(resp);
          console.log(resp.token)
          let token = resp.token;
          localStorage.setItem("token", JSON.stringify(token));
          alert('next successsss');
        },
        error: (err) => {
          console.log(err.error.message);
          alert('error failllllll');
        },
      });
  }


  
  checkForm = new FormGroup({});

  loginCheck() {
    console.log('LOGIN CHECK');

    this.http
      .get<any>('http://localhost:3000/poke/checkUser')
      .subscribe({
        next: (value) => {
          console.log(value);
          alert('next successsss');
        },
        error: (err) => {
          console.log(err);
          alert('error failllllll');
        },
      });
  }
}
