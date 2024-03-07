import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private http: HttpClient) {}

  updatePokemonsForm = new FormGroup({
    generation: new FormControl('', [
      Validators.required
    ])
  })

  onSubmit() {
    this.http
      .post<any>('http://localhost:3000/poke/update', this.updatePokemonsForm.value)
      .subscribe({
        next: (resp) => {
          console.log(resp);
          alert('updated');
        },
        error: (err) => {
          console.log(err);
          alert('not updated');
        },
      });
  }

}
