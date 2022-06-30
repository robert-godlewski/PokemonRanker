// JS Library
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';

// Components
import NavBar from './NavBar';


const ViewPokemon = (props) => {
    const {id} = useParams();
    const {pokemon, setPokemon} = props;

    // Pokemon Evolution Chain
    const [evolutionChain, setEvolutionChain] = useState({});

    // Pokemon Stats
    const [type1, setType1] = useState("");
    const [type2, setType2] = useState("");
    const [hp, setHP] = useState("");
    const [attack, setAttack] = useState("");
    const [defense, setDefense] = useState("");
    const [spAttack, setSPAttack] = useState("");
    const [spDefense, setSPDefense] = useState("");
    const [speed, setSpeed] = useState("");

    // For getting the evolution chain - Algorithm here is a linked list
    const EvolutionChain = (link) => {
        console.log(link);
        axios.get(link).then((res) => {
            //console.log(res);
            //console.log(res.data);
            //console.log(res.data.chain);
            // First pokemon in the list
            if (!res.data.chain.evolves_to) {
                // Means that this pokemon doesn't evolve to or from any other pokemon.
                setEvolutionChain({});
            } else {
                setEvolutionChain(res.data.chain);
                //console.log(res.data.chain.evolves_to);
                //console.log(res.data.chain.evolves_to[0]);
                //console.log(res.data.chain.species);
                // Second pokemon(s) in the list - How the previous evolves to this one
                //console.log(res.data.chain.evolves_to[0].evolution_details);
                //console.log(res.data.chain.evolves_to[0].evolution_details[0]);
                //console.log(res.data.chain.evolves_to[0].evolution_details[0].trigger);
                // Second pokemon
                //console.log(res.data.chain.evolves_to[0].species);
                // Second pokemon evolving to the next
                //console.log(res.data.chain.evolves_to[0].evolves_to[0]);
                //console.log(res.data.chain.evolves_to[0].evolves_to[0].species);
            }
        })
        .catch((err) => console.log(err));
    };

    // For getting a lot of the pokemon stats
    const PokemonStats = (link) => {
        // link = `https://pokeapi.co/api/v2/pokemon/${id}`
        console.log(link);
        axios.get(link).then((res) => {
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
            //List of Moves the pokemon can learn
            //console.log(res.data.moves);
        })
        .catch((err) => console.log(err));
    };

    // For getting a pokemon base stats.
    useEffect(() => {
        // Move this stuff to another function
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        .then((res) => {
            //console.log(res);
            //console.log(res.data);
            // Needed data for the pokemon
            //console.log(res.data.evolution_chain);
            EvolutionChain(res.data.evolution_chain.url)
            //console.log(res.data.generation);
            //console.log(res.data.growth_rate);
            //console.log(res.data.habitat);
            //console.log(res.data.has_gender_differences);
            //console.log(res.data.name);
            //console.log(res.data.pokedex_numbers);
            // To get the stats - need to see for all pokemon though
            //console.log(res.data.varieties);
            //console.log(res.data.varieties[0]);
            //console.log(res.data.varieties[0].pokemon);
            //console.log(res.data.varieties[0].pokemon.url);
            PokemonStats(res.data.varieties[0].pokemon.url);
        })
        .catch((err) => console.log(err));
    }, [id]);

    return (
        <>
            <NavBar/>
            <div>
                {/*console.log(id)}
                {console.log(typeof(id))*/}
                <h4>{pokemon.name} - {pokemon.id}</h4>
                {pokemon.sprites && pokemon.sprites.front_female ? <p>Left side is male and right side is female</p> : null}
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
                <h4>Evolution Chain</h4>
                {console.log(evolutionChain)}
            </div>
            <div>
                <h4>In National Pokedex Order</h4>
                {parseInt(pokemon.id)-1 > 0 ? <span><Link to={`/pokemon/${parseInt(pokemon.id)-1}`}>previous</Link> | </span> : null}
                <Link to={`/pokemon/${parseInt(pokemon.id)+1}`}>next</Link>
            </div>
        </>
    );
};


export default ViewPokemon;