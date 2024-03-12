import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  pokemons!: any;
  pokemonTypes: string[];
  shiny: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
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
          alert(resp.message);
          if(resp.message !== 'OK') {
            return;
          }
        },
        error: (err) => {
          alert(err.message);
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
          this.pokemons = resp.data;
          this.shiny = false;
        },
        error: (err) => {
          this.redirect(err.status);
        },
      });
  }

  getPokemonsByType() {
    this.http
      .post<any>('http://localhost:3000/poke/type', this.typeForm.value)
      .subscribe({
        next: (resp) => {
          this.pokemons = resp.data;
          this.shiny = false;
        },
        error: (err) => {
          this.redirect(err.status);
        },
      });
  }

  getShinyPokemon() {
    this.http
      .post<any>('http://localhost:3000/poke/random', this.typeForm.value)
      .subscribe({
        next: (resp) => {
          this.pokemons = [resp.data];
          this.shiny = true;
        },
        error: (err) => {
          this.redirect(err.status);
        },
      });
  }

  async redirect(statusCode: number) {
    if (statusCode == 401) {
      await this.router.navigate(['/poke/login']);
    } else {
      alert('Server Error');
    }
  }
}
