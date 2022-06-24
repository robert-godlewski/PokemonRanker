// JS Library
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';

// Components
import NavBar from './NavBar';


const ViewPokemon = (props) => {
    const {id} = useParams();
    const {pokemon, setPokemon} = props;

    const [type1, setType1] = useState("");
    const [type2, setType2] = useState("");
    const [hp, setHP] = useState("");
    const [attack, setAttack] = useState("");
    const [defense, setDefense] = useState("");
    const [spAttack, setSPAttack] = useState("");
    const [spDefense, setSPDefense] = useState("");
    const [speed, setSpeed] = useState("");

    // For getting a pokemon base details.
    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => {
            //console.log(res);
            //console.log(res.data);
            setPokemon(res.data);
            //console.log(res.data.types);
            setType1(res.data.types[0].type.name);
            if (res.data.types.length > 1) {
                setType2(res.data.types[1].type.name);
            } else {
                // Need to reset the value when switching to different pokemon
                setType2("");
            }
            //console.log(res.data.stats);
            setHP(res.data.stats[0].base_stat);
            setAttack(res.data.stats[1].base_stat);
            setDefense(res.data.stats[2].base_stat);
            setSPAttack(res.data.stats[3].base_stat);
            setSPDefense(res.data.stats[4].base_stat);
            setSpeed(res.data.stats[5].base_stat);
        })
        .catch((err) => console.log(err));
    }, [id]);

    return (
        <>
            <NavBar/>
            <div>
                {console.log(id)}
                {console.log(typeof(id))}
                <h4>{pokemon.name} - {pokemon.id}</h4>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                {pokemon.sprites ? <img src={pokemon.sprites.front_default} alt='default pokemon pic'/> : null}
                {pokemon.sprites && pokemon.sprites.front_female ? <img src={pokemon.sprites.front_female} alt='female pokemon pic'/> : null}
                <p>Metric: Height = {parseInt(pokemon.height)/10} m, Weight = {parseInt(pokemon.weight)/10} kg</p>
                <p>Imperial: Height = {parseInt(pokemon.height)*0.3281} ft, Weight = {parseInt(pokemon.weight)*0.2205} lbs</p>
                <p>
                    Types: {type1} <span>{type2 ? <>and {type2}</> : null}</span>
                </p>
                <p>Stats:</p>
                <ol>
                    <li>HP - {hp}</li>
                    <li>Attack - {attack}</li>
                    <li>Defense - {defense}</li>
                    <li>Special Attack - {spAttack}</li>
                    <li>Special Defense - {spDefense}</li>
                    <li>Speed - {speed}</li>
                </ol>
            </div>
            <div>
                {parseInt(pokemon.id)-1 > 0 ? <span><Link to={`/pokemon/${parseInt(pokemon.id)-1}`}>previous</Link> | </span> : null}
                <Link to={`/pokemon/${parseInt(pokemon.id)+1}`}>next</Link>
            </div>
        </>
    );
};


export default ViewPokemon;