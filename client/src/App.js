// Stylesheets
import './App.css';

// Modules
import React, {useState} from 'react';

// Components
import NavBar from './components/NavBar';
import ViewPokemonList from './components/ViewPokemonList';


function App() {
  const [pokemonList, setPokemonList] = useState([]);

  return (
    <div className="App">
      <NavBar/>
      <ViewPokemonList pokemonList={pokemonList} setPokemonList={setPokemonList}/>
    </div>
  );
};


export default App;
