import React, {useEffect} from 'react';
import axios from 'axios';


const ViewPokedex = (props) => {
    const {pokedexList, setPokedexList} = props;

    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokedex/?limit=28")
        .then((res) => {
            //console.log(res);
            //console.log(res.data);
            console.log(res.data.results);
            setPokedexList(res.data.results);
        })
        .catch((err) => {console.log(err)});
    }, []);

    return (
        <div>
            <h3>PokeDex List</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID Number</th>
                        <th>PokeDex Name</th>
                        <th>API Link</th>
                    </tr>
                </thead>
                <tbody>
                    {pokedexList.map((pokedex, index) => {
                        return (<tr key={index}>
                            <td>{index + 1}</td>
                            <td>{pokedex.name}</td>
                            <td>{pokedex.url}</td>
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
};


export default ViewPokedex;
