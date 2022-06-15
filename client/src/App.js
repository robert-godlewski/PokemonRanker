// Stylesheets
import './App.css';

// Modules
import React, {useState} from 'react';

// Components
import NavBar from './components/NavBar';
// Views all of the pokedexes in a table
import ViewPokedex from './components/ViewPokedex';
// Lists out all of the pokemon in a table
import ViewPokemonList from './components/ViewPokemonList';


function App() {
  const [pokedexList, setPokedexList] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);

  return (
    <div className="App">
      <NavBar/>
      <ViewPokedex
        pokedexList={pokedexList}
        setPokedexList={setPokedexList}
      />
      <ViewPokemonList
        pokemonList={pokemonList} 
        setPokemonList={setPokemonList}
      />
    </div>
  );
};


export default App;
