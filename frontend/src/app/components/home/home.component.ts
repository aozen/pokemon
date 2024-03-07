import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  pokemons!: object;

  constructor(private http: HttpClient) {}

  updatePokemonsForm = new FormGroup({
    generation: new FormControl('', [Validators.required]),
  });

  fetchPokemonsForm = new FormGroup({
    generation: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    // this.displayPokemons();
    this.http
      .post<any>(
        'http://localhost:3000/poke/update',
        this.updatePokemonsForm.value
      )
      .subscribe({
        next: (resp) => {
          console.log(resp);
          alert('updated');
          // this.displayPokemons();
        },
        error: (err) => {
          console.log(err);
          alert('not updated');
        },
      });
  }

  getPokemons() {
    console.log(this.fetchPokemonsForm.value);
    this.http
      .post<any>(
        'http://localhost:3000/poke/generation',
        this.fetchPokemonsForm.value
      )
      .subscribe({
        next: (resp) => {
          // alert('updated');
          console.log(typeof resp.pokemons);
          this.displayPokemons(resp.pokemons);
          // this.pokemons = resp.pokemons;
        },
        error: (err) => {
          console.log(err);
          alert('not updated');
        },
      });
  }

  displayPokemons = (pokemons: any) => {
    console.log(pokemons[0].name);
    // console.log(typeof Object.keys(pokemons))
    console.log(typeof pokemons[0]);
    this.pokemons = pokemons;
    // console.log(typeof this.pokemons[0]);
  };
}
