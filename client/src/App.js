// Stylesheets
import './App.css';

// JS Libraries
import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

// Components
import IndexPage from './components/IndexPage';
import ViewPokemonList from './components/ViewPokemonList';
import ViewPokemon from './components/ViewPokemon';


function App() {
  const [pokedexList, setPokedexList] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemon, setPokemon] = useState([]);

  return (
    <div className="App container">
      <BrowserRouter>
        <Routes>
          {/* Main Page */}
          <Route
            path='/'
            element={<IndexPage
              pokedexList={pokedexList}
              setPokedexList={setPokedexList}
            />}
          />
          {/* Pokedexes */}
          <Route
            path='/pokedex/:id'
            element={<ViewPokemonList
              pokemonList={pokemonList}
              setPokemonList={setPokemonList}
            />}
          />
          {/* Individual Pokemon */}
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
