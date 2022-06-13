// Stylesheets
import './App.css';

// Modules
import React, {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon/?limit=898")
    .then((res) => {
      //console.log(res);
      //console.log(res.data);
      console.log(res.data.results);
      setPokemonList(res.data.results);
    })
    .catch((err) => {console.log(err)});
  }, []);

  return (
    <div className="App">
      <h1>Pokemon</h1>
      <table>
        <thead>
          <tr>
            <th>ID Number</th>
            <th>Name</th>
            <th>API Link</th>
          </tr>
        </thead>
        <tbody>
          {pokemonList.length > 0 && pokemonList.map((pokemon, index) => {
            return (<tr key={index}>
              <td>{index + 1}</td>
              <td>{pokemon.name}</td>
              <td>{pokemon.url}</td>
            </tr>)
          })}
        </tbody>
      </table>
      {/* List to see all of the pokemon 
      <ol>
        {pokemonList.length > 0 && pokemonList.map((pokemon, index) => {
          return (<li key={index}>{pokemon.name}</li>)
        })}
      </ol>
      */}
    </div>
  );
}

export default App;
