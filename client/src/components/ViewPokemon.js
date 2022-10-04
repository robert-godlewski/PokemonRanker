// JS Library
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import {useQuery} from 'react-query';

// Components
import NavBar from './NavBar';


const ViewPokemon = (props) => {
    const {id} = useParams();
    const {pokemon, setPokemon} = props;

    // Needed data variables, each one has an api call
    const [pokemonSpecies, setPokemonSpecies] = useState({});
    const [evolutionNum, setEvolutionNum] = useState(0);
    const [evolutionChain, setEvolutionChain] = useState({});

    // Pokemon Stats
    /*
    const [type1, setType1] = useState("");
    const [type2, setType2] = useState("");
    const [baseEx, setBaseEx] = useState("");
    const [hp, setHp] = useState("");
    const [attack, setAttack] = useState("");
    const [defense, setDefense] = useState([]);
    const [spAttack, setSpAttack] = useState([]);
    const [spDefense, setSpDefense] = useState([]);
    const [speed, setSpeed] = useState([]);
    */

    /*
    const EvolutionChain = (link) => {
        // link = `https://pokeapi.co/api/v2/evolution-chain/${a_number_not_id}`
        //console.log(link);
        axios.get(link).then((res) => {
            //console.log(res);
            //console.log(res.data);
            //console.log(res.data.chain);
            // First pokemon in the list
            if (!res.data.chain.evolves_to) {
                // Means that this pokemon doesn't evolve to or from any other pokemon.
                setEvolutionChain({});
            } else {
                // Will need to edit this function for pokemon that evolve differently
                var CreateList = (arr) => {
                    //console.log('In function:');
                    //console.log(arr);
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
                        //console.log(species["name"]);
                        //console.log(species["pokeid"]);
                        //console.log(species["evolution_trigger"]);
                        //console.log(species["trigger_type"]);
                        //console.log(species["trig_val"]);
                        //console.log(species["time_of_day"]);
                        new_arr.push(species);
                    }
                    return new_arr;
                }
                //setEvolutionChain(res.data.chain);
                // First evolution
                //console.log('First Evolution:');
                //console.log(res.data.chain.species);
                //console.log(res.data.chain.species.name);
                //console.log(res.data.chain.species.url);
                //console.log(res.data.chain.species.url.split("/"));
                //console.log(res.data.chain.species.url.split("/")[6]);
                var base_species = {
                    "name": res.data.chain.species.name,
                    "pokeid": res.data.chain.species.url.split("/")[6]
                }
                //console.log(base_species["name"]);
                //console.log(base_species["pokeid"]);
                //console.log(res.data.chain.evolves_to);
                // Second Evolutions
                //console.log('Second Evolution(s):');
                var group2;
                if (res.data.chain.evolves_to.length >= 1) {
                    //console.log(res.data.chain.evolves_to[0].species);
                    //console.log(res.data.chain.evolves_to[0].species.name);
                    group2 = CreateList(res.data.chain.evolves_to);
                    //console.log(group2);
                    //console.log(res.data.chain.evolves_to[0].evolves_to);
                    //console.log(res.data.chain.evolves_to[0].evolves_to[0]);
                } else {
                    group2 = [];
                }
                // Third Evolutions
                //console.log('Third Evolution(s):');
                // Uncertain if there are others on other chains
                var group3;
                if (res.data.chain.evolves_to[0].evolves_to.length >= 1) {
                    //console.log(res.data.chain.evolves_to[0].evolves_to[0].species);
                    //console.log(res.data.chain.evolves_to[0].evolves_to[0].species.name);
                    group3 = CreateList(res.data.chain.evolves_to[0].evolves_to);
                    //console.log(group3);
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
    */

    // For getting a lot of the pokemon stats
    /*
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
            //console.log(`Base Experience = ${res.data.base_experience}`);
            setBaseEx(res.data.base_experience);
            //console.log(res.data.stats);
            setHp(res.data.stats[0].base_stat);
            setAttack(res.data.stats[1].base_stat);
            setDefense(res.data.stats[2].base_stat);
            setSpAttack(res.data.stats[3].base_stat);
            setSpDefense(res.data.stats[4].base_stat);
            setSpeed(res.data.stats[5].base_stat);
            //console.log("Abilities:");
            //console.log(res.data.abilities);
            // Might add in forms but unsure if this is necessary
            //console.log("List of Forms");
            //console.log(res.data.forms);
            //console.log("List of Games");
            //console.log(res.data.game_indices);
            //console.log("Moves List:");
            //console.log(res.data.moves);
        })
        .catch((err) => console.log(err));
    };
    */

    // For getting a pokemon information
    // Noncached
    /*
    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        .then((res) => {
            console.log(res);
            console.log(res.data);
            console.log(res.data.base_happiness);
            console.log(res.data.capture_rate);
            // Needed data for the pokemon
            //console.log(res.data.evolution_chain);
            //EvolutionChain(res.data.evolution_chain.url)
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
            //PokemonStats(res.data.varieties[0].pokemon.url);
        })
        .catch((err) => console.log(err));
    }, [id]);
    */

    // Caching the data from the initial call
    const [loading, setLoading] = useState(true);
    const results = useQuery(`pokemon-species-${id}`, () => {
        return axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        .then((res) => {
            //console.log(res);
            // Base all calls off of this base data
            console.log("All of the data from pokemon-species:")
            console.log(res.data);
            //console.log("Base Happiness:");
            //console.log(res.data.base_happiness);
            //console.log("Capture Rate:");
            //console.log(res.data.capture_rate);
            //console.log("Color:");
            //console.log(res.data.color);
            //console.log("Egg Groups:");
            //console.log(res.data.egg_groups);
            // Really want this
            console.log("Evolution Chain:");
            //console.log(res.data.evolution_chain);
            console.log(res.data.evolution_chain.url);
            let evolution_url = res.data.evolution_chain.url;
            let arr_ev_ul = evolution_url.split("/");
            console.log(arr_ev_ul);
            console.log(arr_ev_ul[6]);
            //EvolutionChain(res.data.evolution_chain.url)
            setEvolutionNum(arr_ev_ul[6]);
            // Might want this
            //console.log("Evolves from:");
            //console.log(res.data.evolves_from_species);

            console.log("Flavors:");
            console.log(res.data.flavor_text_entries);
            console.log("Form Descriptions:");
            console.log(res.data.form_descriptions);
            console.log("Are the Forms Switchable?");
            console.log(res.data.forms_switchable);
            //console.log("Gender Rate:");
            //console.log(res.data.gender_rate);
            console.log("Genera:");
            console.log(res.data.genera);
            // Really want this
            //console.log("Generation:");
            //console.log(res.data.generation);

            // Might want this
            //console.log("Growth Rate:");
            //console.log(res.data.growth_rate);

            // Might want this
            //console.log("Habitat:");
            //console.log(res.data.habitat);

            // Will be usefull for gathering pokemon data
            //console.log("Gender Differences?");
            //console.log(res.data.has_gender_differences);
            //console.log("Hatch Counter:");
            //console.log(res.data.hatch_counter);
            //console.log("ID number of the Pokemon:");
            //console.log(res.data.id);
            //console.log("Is baby?");
            //console.log(res.data.is_baby);
            //console.log("Is a legendary Pokemon?");
            //console.log(res.data.is_legendary);
            //console.log("Is a mythical Pokemon?");
            //console.log(res.data.is_mythical);
            // Really want this
            //console.log("Pokemon name:")
            //console.log(res.data.name);
            //console.log(res.data.names);
            //console.log("Order number:");
            //console.log(res.data.order);
            console.log("Pal Park Encounters:");
            console.log(res.data.pal_park_encounters);
            // Really want this
            //console.log("Number in available pokedexes:");
            //console.log(res.data.pokedex_numbers);
            //console.log("Shape");
            //console.log(res.data.shape);
            // To get the stats - need to see for all pokemon though
            console.log("Variations for this pokemon:");
            console.log(res.data.varieties);
            //console.log(res.data.varieties[0]);
            //console.log(res.data.varieties[0].pokemon);
            //console.log(res.data.varieties[0].pokemon.url);
            //PokemonStats(res.data.varieties[0].pokemon.url);
            setPokemonSpecies(res.data);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setLoading(true);
        });
    });
    console.log("Species Results:");
    console.log(results);

    // For getting the evolution chain - Algorithm here is a linked list
    const evolution_results = useQuery(`evolution-chain-${evolutionNum}`, () => {
        return axios.get(`https://pokeapi.co/api/v2/evolution-chain/${evolutionNum}`)
        .then((res) => {
            console.log(res);
            console.log("All of the data from evolution-chain:");
            console.log(res.data);
            console.log(res.data.chain);
            // First Evolution
            console.log("First Evolution:");
            //console.log(res.data.chain.species);
            console.log(res.data.chain.species.name);
            // Second Evolution
            console.log("Second Evolution:");
            //
            setEvolutionChain(res.data);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setLoading(true);
        });
    });
    console.log("Evolution Results:");
    console.log(evolution_results);

    if (loading) return <><h1>Loading..</h1></>;

    // View of the data on a webpage
    return (
        <>
            <NavBar/>
            <div>
                {/*console.log(id)}
                {console.log(typeof(id))}
                {console.log(pokemonSpecies)}
                {console.log(pokemonSpecies.id)*/}
                <h3>{pokemonSpecies.name}</h3>
                <div className='container row'>
                    <div className='border col-6'>
                        <h5>Basic Details</h5>
                        {pokemonSpecies.has_gender_differences ? <p>There is a gender difference in appearace.</p> : <p>There is no gender difference in appearance.</p>}
                        {pokemonSpecies.is_baby ? <p>This pokemon is a baby species</p> : null}
                        {pokemonSpecies.is_legendary ? <p>This is a legendary pokemon</p> : null}
                        {pokemonSpecies.is_mythical ? <p>This is a mythical pokemon</p> : null}
                        {!pokemonSpecies.is_baby && !pokemonSpecies.is_legendary && !pokemonSpecies.is_mythical ? <p>No special indicators for this pokemon</p> : null}
                        {pokemonSpecies.gender_rate > 0 ? <table className='container table table-striped border'>
                            <thead>
                                <tr>
                                    <th>Gender</th>
                                    <th>Percentage</th>
                                    <th>Ratio</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Female</td>
                                    <td>{(parseInt(pokemonSpecies.gender_rate)/8)*100}%</td>
                                    <td>{pokemonSpecies.gender_rate}/8</td>
                                </tr>
                                <tr>
                                    <td>Male</td>
                                    <td>{100-((parseInt(pokemonSpecies.gender_rate)/8)*100)}%</td>
                                    <td>{8-(parseInt(pokemonSpecies.gender_rate))}/8</td>
                                </tr>
                            </tbody>
                        </table> : <p>This is a generless pokemon.</p>}
                        <table className='container table table-striped border'>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Value</th>
                                    {/*<th>URL</th>*/}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Pokemon Generation Introduction</th>
                                    <td>{pokemonSpecies.generation.name}</td>
                                    {/*<td>{pokemonSpecies.generation.url}</td>*/}
                                </tr>
                                <tr>
                                    <th>Habitat</th>
                                    <td>{pokemonSpecies.habitat.name}</td>
                                    {/*<td>{pokemonSpecies.habitat.url}</td>*/}
                                </tr>
                                <tr>
                                    <th>Pokemon Color</th>
                                    <td>{pokemonSpecies.color.name}</td>
                                    {/*<td>{pokemonSpecies.color.url}</td>*/}
                                </tr>
                                <tr>
                                    <th>Shape</th>
                                    <td>{pokemonSpecies.shape.name}</td>
                                    {/*<td>{pokemonSpecies.shape.url}</td>*/}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='border col-6'>
                        <p>Sprites go here....</p>
                    </div>
                    <div className='border'>
                        <h5>Raising</h5>
                        <h6>Pokedex listings</h6>
                        <table className='container table table-striped border'>
                            <thead>
                                <tr>
                                    <th>Pokedex</th>
                                    <th>Number</th>
                                    {/*<th>URL</th>*/}
                                </tr>
                            </thead>
                            <tbody>
                                {pokemonSpecies.pokedex_numbers.map((dex, index) => {
                                    return (<tr key={index}>
                                        {/* Change the name to the url and hide the url from the table */}
                                        <td>{dex.pokedex.name}</td>
                                        <td>{dex.entry_number}</td>
                                        {/*<td>{dex.pokedex.url}</td>*/}
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                        <h6>Other details</h6>
                        <table className='container table table-striped border'>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Catch Rate</th>
                                    <td>{pokemonSpecies.capture_rate}/255 = {(parseInt(pokemonSpecies.capture_rate)/255)*100}%</td>
                                </tr>
                                <tr>
                                    <th>Base Happiness</th>
                                    <td>{pokemonSpecies.base_happiness}/255 = {(parseInt(pokemonSpecies.base_happiness)/255)*100}%</td>
                                </tr>
                                <tr>
                                    <th>Growth Rate</th>
                                    <td>{pokemonSpecies.growth_rate.name} = {pokemonSpecies.growth_rate.url}</td>
                                </tr>
                                <tr>
                                    <th>Evolution Chain?</th>
                                    {/*<td>{pokemonSpecies.evolution_chain ? <span>Yes</span> : <p>No</p>}</td>*/}
                                    <td>{pokemonSpecies.evolution_chain.url ? pokemonSpecies.evolution_chain.url : <span>None</span>}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='border'>
                        <h5>Breeding</h5>
                        <h6>Egg and Hatching</h6>
                        <table className='container table table-striped border'>
                            <thead>
                                <tr>
                                    <th>Egg Group</th>
                                    <th>URL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pokemonSpecies.egg_groups.map((group, index) => {
                                    return (<tr key={index}>
                                        <td>{group.name}</td>
                                        <td>{group.url}</td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                        <table className='container table table-striped border'>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Hatch Counter</th>
                                    <td>{pokemonSpecies.hatch_counter}</td>
                                </tr>
                                <tr>
                                    <th>Number of Steps</th>
                                    <td>{(parseInt(pokemonSpecies.hatch_counter)+1)*255}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {/**}
                <h3>Old below</h3>
                {console.log("edit everything below here.......")}
                {/* Sprites - Kind of Buggy here *}
                {console.log("Pokemon Sprites")}
                {console.log(pokemon.sprites)}
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
                {**}
                {/* Measurements *}
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
                {/* Types - change into links *}
                <h5>Types:</h5>
                <p>
                    <span>{type1}</span> <span>{type2 ? <>and {type2}</> : null}</span>
                </p>
                {/* Pokemon base stats and experience *}
                <h5>Stats:</h5>
                <table className='container table table-striped'>
                    <thead>
                        <tr>
                            <th>Base Experience</th>
                            <th>HP</th>
                            <th>Attack</th>
                            <th>Defense</th>
                            <th>Special Attack</th>
                            <th>Special Defense</th>
                            <th>Speed</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{baseEx}</td>
                            <td>{hp}</td>
                            <td>{attack}</td>
                            <td>{defense}</td>
                            <td>{spAttack}</td>
                            <td>{spDefense}</td>
                            <td>{speed}</td>
                        </tr>
                    </tbody>
                </table>
                {/*<p>
                    {hp > speed ? <span>
                        Favor a {pokemon.name} who has more hp than speed.
                    </span> : null}
                    {hp < speed ? <span>
                        Favor a {pokemon.name} who has more speed than hp.
                    </span> : null}
                    {hp === speed ? <span>
                        HP and speed are generally the same for a {pokemon.name}.
                    </span> : null}
                    <span>  </span>
                    {attack > spAttack ? <span>
                        A {pokemon.name} with high attack should be use for battle.
                    </span> : null}
                    {attack < spAttack ? <span>
                        A {pokemon.name} with a high special attack should be used for battle.
                    </span> : null}
                    {attack === spAttack ? <span>
                        Both attack and special attack are the same for a {pokemon.name}.
                    </span> : null}
                    <span>  </span>
                    {defense > spDefense ? <span>
                        Also favor a {pokemon.name} who has high defense stat.
                    </span> : null}
                    {defense < spDefense ? <span>
                        Also favor a {pokemon.name} who has high special defense stat.
                    </span> : null}
                    {defense === spDefense ? <span>
                        Both defense and special defense are the same for a {pokemon.name}.
                    </span> : null}
                </p>*}
            </div>
            {/* Abilities *}
            {console.log("Abilities:")}
            {console.log(pokemon.abilities)}
            {/* Moves *}
            {console.log("Moves:")}
            {console.log(pokemon.moves)}
            {/* Evolution chain */}
            {/*evolutionChain["group1"] ? <div>
                <h3>Evolution Chain</h3>
                {console.log('Evolution Chain:')}
                {console.log(evolutionChain)}
                <div>
                    <h4>Base evolution</h4>
                    {console.log(evolutionChain["group1"])}
                    <Link to={`/pokemon/${parseInt(evolutionChain["group1"]["pokeid"])}`}>
                        {evolutionChain["group1"]["name"]}
                    </Link>
                </div>
                <div>
                    <h4>Evolutions of {evolutionChain["group1"]["name"]}</h4>
                    {console.log(evolutionChain["group2"])}
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
                    {console.log(evolutionChain["group3"])}
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
            </div> : <div><p>{pokemon.name} has no evolutions.</p></div>}*/}
            {/* Details about which games this pokemon is in *}
            {console.log("Game Indices:")}
            {console.log(pokemon.game_indices)}
            {/* Moving through National dex order *}
            <div>
                <h3>In National Pokedex Order</h3>
                {parseInt(pokemon.id)-1 > 0 ? <span><Link to={`/pokemon/${parseInt(pokemon.id)-1}`}>previous</Link> | </span> : null}
                <Link to={`/pokemon/${parseInt(pokemon.id)+1}`}>next</Link>
            {**/}
            </div>
        </>
    );
};


export default ViewPokemon;