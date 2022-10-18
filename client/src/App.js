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
import ViewTypes from './components/ViewTypes';


function App() {
  // For caching the data
  let queryClient = new QueryClient();

  const [pokedexList, setPokedexList] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  // Not too sure if I really need this variable
  const [pokemon, setPokemon] = useState([]);
  const [type, setType] = useState([]);

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
                typeList={typeList}
                setTypeList={setTypeList}
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
            {/* Individual Types */}
            <Route
              path='/type/:id'
              element={<ViewTypes
                type={type}
                setType={setType}
              />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
};


export default App;
