// JS Library
import React, {useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom'

// Components
import NavBar from './NavBar';


const ViewPokemonList = (props) => {
    const {id} = useParams();
    const {pokemonList, setPokemonList} = props;

    useEffect(() => {
        /*
        Original to get all pokemon reguardless of pokedex
        axios.get("https://pokeapi.co/api/v2/pokemon/?limit=898")
        .then((res) => {
            console.log(res);
            console.log(res.data);
            console.log(res.data.results);
            setPokemonList(res.data.results);
        })
        .catch((err) => {console.log(err)});
        */
        // Gets the National Dex Only
        /*
        axios.get("https://pokeapi.co/api/v2/pokedex/1")
        .then((res) => {
            console.log(res);
            console.log(res.data);
            console.log(res.data.pokemon_entries);
            setPokemonList(res.data.pokemon_entries);
        })
        .catch((err) => console.log(err));
        */
        axios.get(`https://pokeapi.co/api/v2/pokedex/${id}`)
        .then((res) => {
            console.log(res);
            console.log(res.data);
            console.log(res.data.pokemon_entries);
            setPokemonList(res.data.pokemon_entries);
        })
        .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <NavBar/>
            <table className='container table table-striped'>
                <thead>
                    <tr>
                        <th>ID Number</th>
                        <th>Pokemon Name</th>
                        <th>API Link</th>
                    </tr>
                </thead>
                <tbody>
                    {pokemonList.length > 0 && pokemonList.map((pokemon, index) => {
                        return (<tr key={index}>
                            <td>{pokemon.entry_number}</td>
                            {/* Works only for national dex! */}
                            <td>
                                <Link to={`/pokemon/${pokemon.entry_number}`}>
                                    {pokemon.pokemon_species.name}
                                </Link>
                            </td>
                            {/**}
                            <td>
                                <Link to={`/pokemon/${(pokemon.pokemon_species.url) => {
                                    // Need to do something to get the number at the end
                                }}`}>{pokemon.pokemon_species.name}</Link>
                            </td>
                            {/**/}
                            <td>{pokemon.pokemon_species.url}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    );
};


export default ViewPokemonList;
