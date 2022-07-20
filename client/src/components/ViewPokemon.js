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
    // index reference: 0=hp, 1=attack, 2=defense, 3=spAttack, 4=spDefense, 5=speed
    const [stats, setStats] = useState([]);

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
                        // Solve bugs here
                        // How the pokemon evolves
                        var trigger_type;
                        // Level to set the trigger to evolve
                        var trig_val;
                        // Time of day needed to evolve
                        var td = null;
                        if (evol_trig === "level-up") {
                            if (arr[i].evolution_details[0].min_level) {
                                trigger_type = "level-up";
                                trig_val = arr[i].evolution_details[0].min_level;
                            } else if (arr[i].evolution_details[0].min_happiness) {
                                trigger_type = "happiness";
                                trig_val = arr[i].evolution_details[0].min_happiness;
                            }
                            if (arr[i].evolution_details[0].time_of_day) {
                                td = arr[i].evolution_details[0].time_of_day;
                            }
                        } else if (evol_trig === "use-item") {
                            trigger_type = "item";
                            trig_val = arr[i].evolution_details[0].item.name;
                        } else if (evol_trig === "trade") {
                            trigger_type = "trade"
                            if (arr[i].evolution_details[0].held_item) {
                                trig_val = arr[i].evolution_details[0].held_item.name;
                            } else {
                                trig_val = "";
                            }
                        }
                        var species = {
                            "name": arr[i].species.name,
                            "pokeid": arr[i].species.url.split("/")[6],
                            "evolution_trigger": evol_trig,
                            "trigger_type": trigger_type,
                            "trig_val": trig_val,
                            "time_of_day": td
                        }
                        console.log(species["name"]);
                        console.log(species["pokeid"]);
                        console.log(species["evolution_trigger"]);
                        console.log(species["trigger_type"]);
                        console.log(species["trig_val"]);
                        console.log(species["time_of_day"]);
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
                console.log(res.data.chain.evolves_to);
                // Second Evolutions
                console.log('Second Evolution(s):');
                var group2;
                if (res.data.chain.evolves_to.length >= 1) {
                    //console.log(res.data.chain.evolves_to[0].species);
                    //console.log(res.data.chain.evolves_to[0].species.name);
                    group2 = CreateList(res.data.chain.evolves_to);
                    console.log(group2);
                    //console.log(res.data.chain.evolves_to[0].evolves_to);
                    //console.log(res.data.chain.evolves_to[0].evolves_to[0]);
                } else {
                    group2 = [];
                }
                // Third Evolutions
                console.log('Third Evolution(s):');
                // Uncertain if there are others on other chains
                var group3;
                if (res.data.chain.evolves_to[0].evolves_to.length >= 1) {
                    //console.log(res.data.chain.evolves_to[0].evolves_to[0].species);
                    //console.log(res.data.chain.evolves_to[0].evolves_to[0].species.name);
                    group3 = CreateList(res.data.chain.evolves_to[0].evolves_to);
                    console.log(group3);
                } else {
                    group3 = [];
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
            setStats([res.data.stats[0].base_stat, res.data.stats[1].base_stat, res.data.stats[2].base_stat, res.data.stats[3].base_stat, res.data.stats[4].base_stat, res.data.stats[5].base_stat]);
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
                {console.log(pokemon)}
                <h3>{pokemon.name} - {pokemon.id}</h3>
                {/* Sprites */}
                <div className='container row'>
                    <div className='col-6'>
                        {pokemon.sprites && pokemon.sprites.front_female ? <h5>Male Version</h5> : <h5>Default Version</h5>}
                        {pokemon.sprites ? <div>
                            <img src={pokemon.sprites.front_default} alt='default pokemon front'/>
                            <img src={pokemon.sprites.back_default} alt='default pokemon back'/>
                        </div> : null}
                    </div>
                    {pokemon.sprites && pokemon.sprites.front_female ? <div className='col-5'>
                        <h5>Female Version</h5>
                        <img src={pokemon.sprites.front_female} alt='female pokemon front'/>
                        <img src={pokemon.sprites.back_female} alt='female pokemon back'/>
                    </div> : null}
                    {pokemon.sprites && pokemon.sprites.front_shiny && pokemon.sprites.front_shiny_female ? <div className='col-6'>
                        <h5>Shiny Male Version</h5>
                        <img src={pokemon.sprites.front_shiny} alt='default pokemon front'/>
                        <img src={pokemon.sprites.back_shiny} alt='default pokemon back'/>
                    </div> : <div className='col-5'>
                        <h5>Shiny Version</h5>
                        <img src={pokemon.sprites.front_shiny} alt='default pokemon front'/>
                        <img src={pokemon.sprites.back_shiny} alt='default pokemon back'/>
                    </div>}
                    {pokemon.sprites && pokemon.sprites.front_shiny_female ? <div className='col-5'>
                        <h5>Shiny Female Version</h5>
                        <img src={pokemon.sprites.front_shiny_female} alt='female pokemon front'/>
                        <img src={pokemon.sprites.back_shiny_female} alt='female pokemon back'/>
                    </div> : null}
                </div>
                {/* Measurements */}
                <table className='container table table-striped'>
                    <thead>
                        <tr>
                            <th>Units</th>
                            <th>Height</th>
                            <th>Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Metric</td>
                            <td>{parseInt(pokemon.height)/10} m</td>
                            <td>{parseInt(pokemon.weight)/10} kg</td>
                        </tr>
                        <tr>
                            <td>Imperial</td>
                            <td>{parseInt(pokemon.height)*0.3281} ft</td>
                            <td>{parseInt(pokemon.weight)*0.2205} lbs</td>
                        </tr>
                    </tbody>
                </table>
                {/* Types - change into links */}
                <h5>Types:</h5>
                <p>
                    <span>{type1}</span> <span>{type2 ? <>and {type2}</> : null}</span>
                </p>
                {/* Pokemon base stats */}
                <h5>Stats:</h5>
                <table className='container table table-striped'>
                    <thead>
                        <tr>
                            <th>HP</th>
                            <th>Attack</th>
                            <th>Defense</th>
                            <th>Special Attack</th>
                            <th>Special Defense</th>
                            <th>Speed</th>
                        </tr>
                    </thead>
                    <body>
                        <tr>
                            <td>{stats[0]}</td>
                            <td>{stats[1]}</td>
                            <td>{stats[2]}</td>
                            <td>{stats[3]}</td>
                            <td>{stats[4]}</td>
                            <td>{stats[5]}</td>
                        </tr>
                    </body>
                </table>
                <p>
                    {stats[0] > stats[5] ? <span>
                        Favor a {pokemon.name} who has more hp than speed.
                    </span> : null}
                    {stats[0] < stats[5] ? <span>
                        Favor a {pokemon.name} who has more speed than hp.
                    </span> : null}
                    {stats[0] === stats[5] ? <span>
                        HP and speed are generally the same for a {pokemon.name}.
                    </span> : null}
                    <span>  </span>
                    {stats[1] > stats[3] ? <span>
                        A {pokemon.name} with high attack should be use for battle.
                    </span> : null}
                    {stats[1] < stats[3] ? <span>
                        A {pokemon.name} with a high special attack should be used for battle.
                    </span> : null}
                    {stats[1] === stats[3] ? <span>
                        Both attack and special attack are the same for a {pokemon.name}.
                    </span> : null}
                    <span>  </span>
                    {stats[2] > stats[4] ? <span>
                        Also favor a {pokemon.name} who has high defense stat.
                    </span> : null}
                    {stats[2] < stats[4] ? <span>
                        Also favor a {pokemon.name} who has high special defense stat.
                    </span> : null}
                    {stats[2] === stats[4] ? <span>
                        Both defense and special defense are the same for a {pokemon.name}.
                    </span> : null}
                </p>
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
                                    {pk["evolution_trigger"] === "level-up" && pk["trigger_type"] === "level-up" ? <span>
                                        Evolves into {pk["name"]} at level {pk["trig_val"]}.
                                    </span> : null}
                                    {pk["evolution_trigger"] === "level-up" && pk["trigger_type"] === "happiness" ? <span>
                                        Evolves into {pk["name"]} with happiness level at {pk["trig_val"]}<span>{pk["time_of_day"] === "day" ? <> in the daytime</> : null}{pk["time_of_day"] === "night" ? <> in the night time</> : null}</span>.
                                    </span> : null}
                                    {pk["evolution_trigger"] === "use-item" ? <span>
                                        Evolves into {pk["name"]} when you give it a {pk["trig_val"]}.
                                    </span>: null}
                                    {pk["evolution_trigger"] === "trade" && pk["trig_val"] === "" ? <span>
                                        Evolves into {pk["name"]} when you trade it.
                                    </span> : null}
                                    {pk["evolution_trigger"] === "trade" && pk["trig_val"] !== "" ? <span>
                                        Evolves into {pk["name"]} when you trade it with a {pk["trig_val"]}.
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
                                    {pk["evolution_trigger"] === "level-up" && pk["trigger_type"] === "level-up" ? <span>
                                        Evolves into {pk["name"]} at level {pk["trig_val"]}.
                                    </span> : null}
                                    {pk["evolution_trigger"] === "level-up" && pk["trigger_type"] === "happiness" ? <span>
                                        Evolves into {pk["name"]} with happiness level at {pk["trig_val"]}.
                                    </span> : null}
                                    {pk["evolution_trigger"] === "use-item" ? <span>
                                        Evolves into {pk["name"]} when you give it a {pk["trig_val"]}.
                                    </span>: null}
                                    {pk["evolution_trigger"] === "trade" && pk["trig_val"] === "" ? <span>
                                        Evolves into {pk["name"]} when you trade it.
                                    </span> : null}
                                    {pk["evolution_trigger"] === "trade" && pk["trig_val"] !== "" ? <span>
                                        Evolves into {pk["name"]} when you trade it with a {pk["trig_val"]}.
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