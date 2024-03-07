import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})

export class SignupPageComponent {

  constructor(private router: Router, private http: HttpClient) {}

  signUpForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
  });

  onSubmit() {
    console.log(this.signUpForm.value);

        this.http.post<any>("http://localhost:3000/poke/register",this.signUpForm.value)
    .subscribe({
      next: value => {console.log(value); alert('next successsss'); this.router.navigate(['/poke/login'])},
      error: err => {console.log(err.error.message); alert('error failllllll')},
      })
  }
  }

// export class SignupPageComponent implements OnInit {
//   register = new FormGroup({
//     email: new FormControl<string>('', [
//       Validators.required,
//       Validators.email
//     ]),
//     password: new FormControl<string>('', [
//       Validators.required
//     ]),
//   });
//   constructor() { }
//   ngOnInit() {
//   }
// }

// export class SignupPageComponent {
//   public signUpForm !: FormGroup
//   // constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }
//   constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) {}


//   ngOnInit(): void {
//     this.signUpForm = this.formBuilder.group({
//       email: [""],
//       password: [""]
//     })
//   }

//   signUp(){
//     this.http.post<any>("http://localhost:3000/poke/register",this.signUpForm.value)
//     .subscribe({
//       next: value => {console.log('Observable emitted the next value: ' + value); alert('qdw')},
//       error: err => console.error('Observable emitted an error: ' + err),
//       })
//   }
// }
