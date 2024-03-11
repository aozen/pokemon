# POKEMON

This project is designed for storing pokemons from an external api service. Also on the frontend pokemons will be display to loggedin users.

## Api

Api address: <https://pokeapi.co/docs/v2>

### Pokemon List

1. Generation: <https://pokeapi.co/api/v2/pokemon?limit=151>
2. Generation: <https://pokeapi.co/api/v2/pokemon?offset=151&limit=100>
3. Generation: <https://pokeapi.co/api/v2/pokemon?offset=251&limit=135>

### Generation informations

1. <https://pokeapi.co/api/v2/generation/1>
2. <https://pokeapi.co/api/v2/generation/2>
3. <https://pokeapi.co/api/v2/generation/3>

These are dont have pokemon informations. It has pokemon-species information.
<https://pokeapi.co/api/v2/pokemon/1> and <https://pokeapi.co/api/v2/pokemon-species/1> are different.
For this project I continued with pokemon lists directly, not generation responses.

## Installation

1. Create .env file

    ```bash
        cp .env.example .env
    ```

2. Edit `.env` file and set necessary fields: `MONGODB_URI`, `APP_PORT` and `JWT_SECRET_KEY`

3. Run npm install both backend&frontend

    ```bash
        cd backend
        npm install
    ```

    and for the frontend:

    ```bash
        cd frontend
        npm install
    ```

## Running

Open two terminal on for backend and the other for frontend

### Backend

1. Run the application

```bash
    cd backend
    npm start
```

### Frontend

Run the application

```bash
    cd frontend
    npm start
```

## Dependencies

1. Backend
    1. "bcryptjs"
    1. "cors"
    1. "dotenv"
    1. "express"
    1. "express-validator"
    1. "jsonwebtoken"
    1. "mongoose"
    1. "nodemon"
1. Frontend
    1. "angular"
    1. "rxjs"

## Endpoints

### Auth

1. `/poke/register`
    1. Data is validating => `user.validator.js`  
    2. Password hashing => `bcrypt`
    3. If its successfull redirects to login, Otherwise returns error messages.

2. `/poke/login`
    1. Checks given email and hashed password
    2. If login successful returns `token`.
    3. On the browser after successful login, `jwt` and `email` is writing to the `localStorage`.
    4. Active `Interceptor Provider` adds token to the `Authorization Header`
    5. Stricted pages are covering with `auth.guard`. It checks is user logged in.
    6. `auth.service` is checking localstorage and validates jwt.
    7. Also there is no endpoint for `logout` but `auth.service` has `logout` and it removes `jwt` from the `localStorage`.

### Pokemons

`Pokemons` are guarded by `AuthGuard` on `app-routing.module.ts`. User has to login, otherwise they are not able to see the screen.

1. `/poke/update`
    1. Fetchs all pokemon informations from external api by given generation number from user.
    2. Collects all pokemon urls and makes http request all of them.
    3. Stores all pokemons in a variable.
    4. Save all of them in a loop.
2. `/poke/generation`
    1. User select generation from dropdown and pokemons will be display.
3. `/poke/type`
    1. User select type from dropdown and pokemons will be display.
4. `/poke/random`
    1. After clicking the "Get Shiny" button random shiny pokemon will be display.

## Database

### Tables

1. users
    1. id
    2. email
    3. password

2. pokemons
    1. id
    2. id_value
    3. generation
    4. name
    5. type
    6. image
    7. shiny_image
