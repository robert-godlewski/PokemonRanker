// Stylesheets
import './App.css';

// JS Libraries
import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';

// Components
import IndexPage from './components/IndexPage';
import ViewPokemonList from './components/ViewPokemonList';
import ViewPokemon from './components/ViewPokemon';


function App() {
  // For caching the data
  let queryClient = new QueryClient();

  const [pokedexList, setPokedexList] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  // Not too sure if I really need this variable
  const [pokemon, setPokemon] = useState([]);

  return (
    <QueryClientProvider client={queryClient}>
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
            {/* Individual Pokedex */}
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
    </QueryClientProvider>
  );
};


export default App;
