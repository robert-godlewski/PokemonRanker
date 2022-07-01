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
        // link = `https://pokeapi.co/api/v2/evolution-chain/${a_number_not_id}`
        //console.log(link);
        axios.get(link).then((res) => {
            //console.log(res);
            //console.log(res.data);
            console.log(res.data.chain);
            // First pokemon in the list
            if (!res.data.chain.evolves_to) {
                // Means that this pokemon doesn't evolve to or from any other pokemon.
                setEvolutionChain({});
            } else {
                // Will need to edit this function for pokemon that evolve differently
                var CreateList = (arr) => {
                    console.log('In function:');
                    console.log(arr);
                    var new_arr = [];
                    for (var i = 0; i < arr.length; i++) {
                        //console.log(res.data.chain.evolves_to[0].evolution_details);
                        //console.log(res.data.chain.evolves_to[0].evolution_details[0]);
                        //console.log(res.data.chain.evolves_to[0].evolution_details[0].trigger);
                        var evol_trig = arr[i].evolution_details[0].trigger.name;
                        // There's a bug here look at pikachu evolution tree for fixing.
                        if (evol_trig === "level-up") {
                            var trig_val = arr[i].evolution_details[0].min_level;
                        }
                        var species = {
                            "name": arr[i].species.name,
                            "pokeid": arr[i].species.url.split("/")[6],
                            "evolution_trigger": evol_trig,
                            "trig_val": trig_val
                        }
                        console.log(species["name"]);
                        console.log(species["pokeid"]);
                        console.log(species["evolution_trigger"]);
                        console.log(species["trig_val"]);
                        new_arr.push(species);
                    }
                    return new_arr;
                }
                //setEvolutionChain(res.data.chain);
                // First evolution
                console.log('First Evolution:');
                //console.log(res.data.chain.species);
                //console.log(res.data.chain.species.name);
                //console.log(res.data.chain.species.url);
                //console.log(res.data.chain.species.url.split("/"));
                //console.log(res.data.chain.species.url.split("/")[6]);
                var base_species = {
                    "name": res.data.chain.species.name,
                    "pokeid": res.data.chain.species.url.split("/")[6]
                }
                console.log(base_species["name"]);
                console.log(base_species["pokeid"]);
                //console.log(res.data.chain.evolves_to);
                // Second Evolutions
                console.log('Second Evolution(s):');
                if (res.data.chain.evolves_to.length >= 1) {
                    //console.log(res.data.chain.evolves_to[0].species);
                    //console.log(res.data.chain.evolves_to[0].species.name);
                    var group2 = CreateList(res.data.chain.evolves_to);
                    console.log(group2);
                    //console.log(res.data.chain.evolves_to[0].evolves_to);
                    //console.log(res.data.chain.evolves_to[0].evolves_to[0]);
                } else {
                    var group2 = [];
                }
                // Third Evolutions
                console.log('Third Evolution(s):');
                // Uncertain if there are others on other chains
                if (res.data.chain.evolves_to[0].evolves_to.length >= 1) {
                    //console.log(res.data.chain.evolves_to[0].evolves_to[0].species);
                    //console.log(res.data.chain.evolves_to[0].evolves_to[0].species.name);
                    var group3 = CreateList(res.data.chain.evolves_to[0].evolves_to);
                    console.log(group3);
                } else {
                    var group3 = [];
                }
                setEvolutionChain({
                    "group1": base_species, 
                    "group2": group2, 
                    "group3": group3
                });
            }
        })
        .catch((err) => console.log(err));
    };

    // For getting a lot of the pokemon stats
    const PokemonStats = (link) => {
        // link = `https://pokeapi.co/api/v2/pokemon/${id}`
        //console.log(link);
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

    // For getting a pokemon information
    useEffect(() => {
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
                <h3>{pokemon.name} - {pokemon.id}</h3>
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
            {evolutionChain["group1"] ? <div>
                <h3>Evolution Chain</h3>
                {/*console.log('Evolution Chain:')}
                {console.log(evolutionChain)*/}
                <div>
                    <h4>Base evolution</h4>
                    {/*console.log(evolutionChain["group1"])*/}
                    <Link to={`/pokemon/${parseInt(evolutionChain["group1"]["pokeid"])}`}>
                        {evolutionChain["group1"]["name"]}
                    </Link>
                </div>
                <div>
                    <h4>Evolutions of {evolutionChain["group1"]["name"]}</h4>
                    {/*console.log(evolutionChain["group2"])*/}
                    {evolutionChain["group2"].map((pk, index) => {
                        return (
                            <div key={index}>
                                <Link to={`/pokemon/${parseInt(pk["pokeid"])}`}>
                                    {pk["name"]}
                                </Link>
                                <p>
                                    {pk["evolution_trigger"] === "level-up" ? <span>
                                        Evolves into {pk["name"]} at level {pk["trig_val"]}.
                                    </span> : null}
                                </p>
                            </div>
                        )
                    })}
                </div>
                {evolutionChain["group3"].length >= 1 ? <div>
                    <h4>Last Evolution Group</h4>
                    {/*console.log(evolutionChain["group3"])*/}
                    {evolutionChain["group3"].map((pk, index) => {
                        return (
                            <div key={index}>
                                <Link to={`/pokemon/${parseInt(pk["pokeid"])}`}>
                                    {pk["name"]}
                                </Link>
                                <p>
                                    {pk["evolution_trigger"] === "level-up" ? <span>
                                        Evolves into {pk["name"]} at level {pk["trig_val"]}.
                                    </span> : null}
                                </p>
                            </div>
                        )
                    })}
                </div> : null}
            </div> : <div><p>{pokemon.name} has no evolutions.</p></div>}
            <div>
                <h3>In National Pokedex Order</h3>
                {parseInt(pokemon.id)-1 > 0 ? <span><Link to={`/pokemon/${parseInt(pokemon.id)-1}`}>previous</Link> | </span> : null}
                <Link to={`/pokemon/${parseInt(pokemon.id)+1}`}>next</Link>
            </div>
        </>
    );
};


export default ViewPokemon;