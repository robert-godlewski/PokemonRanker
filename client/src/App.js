// Stylesheets
import './App.css';

// JS Libraries
import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

// Components
import ViewPokemonList from './components/ViewPokemonList';
import ViewPokemon from './components/ViewPokemon';


function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemon, setPokemon] = useState([]);

  return (
    <div className="App container">
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<ViewPokemonList
              pokemonList={pokemonList}
              setPokemonList={setPokemonList}
            />}
          />
          <Route
            path='/pokemon/:id'
            element={<ViewPokemon
              pokemon={pokemon}
              setPokemon={setPokemon}
            />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};


export default App;
