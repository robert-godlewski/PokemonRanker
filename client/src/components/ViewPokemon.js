// JS Library
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

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

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => {
            //console.log(res);
            console.log(res.data);
            setPokemon(res.data);
            //console.log(res.data.types);
            setType1(res.data.types[0].type.name);
            setType2(res.data.types[1].type.name);
            //console.log(res.data.stats);
            setHP(res.data.stats[0].base_stat);
            setAttack(res.data.stats[1].base_stat);
            setDefense(res.data.stats[2].base_stat);
            setSPAttack(res.data.stats[3].base_stat);
            setSPDefense(res.data.stats[4].base_stat);
            setSpeed(res.data.stats[5].base_stat);
        })
        .catch((err) => console.log(err));
    }, [id])

    return (
        <>
            <NavBar/>
            <div>
                <h4>{pokemon.name} - {pokemon.id}</h4>
                <p>Height = {pokemon.height}, Weight = {pokemon.weight}</p>
                <p>
                    Types: {type1} <span>
                        {type2 ? <>and {type2}</> : null}
                    </span>
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
        </>
    );
};


export default ViewPokemon;