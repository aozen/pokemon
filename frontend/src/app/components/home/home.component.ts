import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  pokemons!: any;
  pokemonTypes: string[];
  shiny: boolean = false;

  constructor(private http: HttpClient) {
    this.pokemonTypes = [
      'normal',
      'fighting',
      'flying',
      'poison',
      'ground',
      'rock',
      'bug',
      'ghost',
      'steel',
      'fire',
      'water',
      'grass',
      'electric',
      'psychic',
      'ice',
      'dragon',
      'dark',
      'fairy',
      'unknown',
      'shadow',
    ];
  }

  generationForm = new FormGroup({
    generation: new FormControl('', [Validators.required]),
  });

  typeForm = new FormGroup({
    type: new FormControl('', [Validators.required]),
  });

  shinyForm = new FormGroup({});

  updatePokemons() {
    this.http
      .post<any>('http://localhost:3000/poke/update', this.generationForm.value)
      .subscribe({
        next: (resp) => {
          console.log(resp);
          alert('Updated! Lets view');
        },
        error: (err) => {
          console.log(err);
          alert('Server Error');
        },
      });
  }

  getPokemons() {
    this.http
      .post<any>(
        'http://localhost:3000/poke/generation',
        this.generationForm.value
      )
      .subscribe({
        next: (resp) => {
          this.pokemons = resp.pokemons;
          this.shiny = false;
        },
        error: (err) => {
          console.log(err);
          alert('Server Error');
        },
      });
  }

  getPokemonsByType() {
    this.http
      .post<any>('http://localhost:3000/poke/type', this.typeForm.value)
      .subscribe({
        next: (resp) => {
          this.pokemons = resp.pokemons;
          this.shiny = false;
        },
        error: (err) => {
          console.log(err);
          alert('Server Error');
        },
      });
  }

  getShinyPokemon() {
    this.http
      .post<any>('http://localhost:3000/poke/random', this.typeForm.value)
      .subscribe({
        next: (resp) => {
          this.pokemons = resp.pokemons;
          this.shiny = true;
        },
        error: (err) => {
          console.log(err);
          alert('Server Error');
        },
      });
  }
}
