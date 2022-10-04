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
    const [evolutionNum, setEvolutionNum] = useState("0");
    const [evolutionChain, setEvolutionChain] = useState({});
    const [evolutionNums, setEvolutionNums] = useState([]);

    // Function for grabbing the index of the evolution chain
    // url is a str
    // returns a str
    const EVC_id = (url) => {
        console.log(url);
        let arr_url = url.split("/");
        console.log(arr_url);
        console.log(arr_url[6]);
        return arr_url[6];
    };

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

    // Initial api request
    const results = useQuery(`pokemon-species-${id}`, () => {
        return axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        .then((res) => {
            //console.log(res);
            // Base all calls off of this base data
            console.log("All of the data from pokemon-species:")
            console.log(res.data);
            // Data that will add in later
            console.log("Data Not posted yet.");
            console.log("Flavors:");
            console.log(res.data.flavor_text_entries);
            console.log("Form Descriptions:");
            console.log(res.data.form_descriptions);
            console.log("Are the Forms Switchable?");
            console.log(res.data.forms_switchable);
            console.log("Genera:");
            console.log(res.data.genera);
            console.log("Pal Park Encounters:");
            console.log(res.data.pal_park_encounters);
            // To get the stats - need to see for all pokemon though
            console.log("Variations for this pokemon:");
            console.log(res.data.varieties);
            //console.log(res.data.varieties[0]);
            //console.log(res.data.varieties[0].pokemon);
            //console.log(res.data.varieties[0].pokemon.url);
            //PokemonStats(res.data.varieties[0].pokemon.url);

            // Saving current api request
            setPokemonSpecies(res.data);
            setLoading(false);

            // Grabbing the Evolution Chain number as a str
            console.log("Evolution Chain:");
            //console.log(res.data.evolution_chain);
            console.log(res.data.evolution_chain.url);
            let evc_id = EVC_id(res.data.evolution_chain.url);
            console.log(evc_id);
            setEvolutionNum(evc_id);
            console.log("------------------");
        })
        .catch((err) => {
            console.log(err);
            setLoading(true);
        });
    });
    console.log("Species Results:");
    console.log(results);

    // For getting the evolution chain and keeping it in the cache
    const evolution_results = useQuery(`evolution-chain-${evolutionNum}`, () => {
        if (evolutionNum == "0") {
            console.log("Default page details will not work here.");
            setLoading(true);
        }
        console.log(`Evolution chain number = ${evolutionNum}`);
        return axios.get(`https://pokeapi.co/api/v2/evolution-chain/${evolutionNum}`)
        .then((res) => {
            //console.log(res);
            console.log("All of the data from evolution-chain:");
            console.log(res.data);
            console.log(res.data.chain);
            // First Evolution
            /*
            console.log("First Evolution:");
            //console.log(res.data.chain.species);
            console.log(res.data.chain.species.name);
            console.log(res.data.chain.species.url);
            let evol1_url = res.data.chain.species.url;
            let arr_evol1_url = evol1_url.split("/");
            console.log(arr_evol1_url[6]);
            */
            // Second Evolution
            /*
            console.log("Second Evolution:");
            console.log(res.data.chain.evolves_to);
            let arr_evol2 = res.data.chain.evolves_to;
            let arr_evol2_indexes = [];
            for (let i = 0; i < arr_evol2.length-1; i++) {
                let ev_url_id_2 = EVC_id(arr_evol2[i]);
                arr_evol2_indexes.push(ev_url_id_2);
            }
            console.log(arr_evol2_indexes);
            */
            // Third Evolution - Bugs possibly
            //console.log("Third Evolution:");

            // Saving the data
            setEvolutionChain(res.data.chain);
            setLoading(false);
            console.log("------------------------");
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
                    {/* A group of random details */}
                    <div className='border col-6'>
                        <h5>Basic Details</h5>
                        {pokemonSpecies.has_gender_differences ? <p>There is a gender difference in appearace.</p> : <p>There is no gender difference in appearance.</p>}
                        {pokemonSpecies.is_baby ? <p>This pokemon is a baby species</p> : null}
                        {pokemonSpecies.is_legendary ? <p>This is a legendary pokemon</p> : null}
                        {pokemonSpecies.is_mythical ? <p>This is a mythical pokemon</p> : null}
                        {!pokemonSpecies.is_baby && !pokemonSpecies.is_legendary && !pokemonSpecies.is_mythical ? <p>No special indicators for this pokemon</p> : null}
                        {pokemonSpecies.evolves_from_species ? <p>This pokemon evolves from <Link to={`/pokemon/${pokemonSpecies.evolves_from_species.name}`}>{pokemonSpecies.evolves_from_species.name}</Link></p> : null}
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
                    {/* Sprites here */}
                    <div className='border col-6'>
                        <p>Sprites go here....</p>
                    </div>
                    {/* Raising and Evolving pokemon */}
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
                                    <td>{pokemonSpecies.evolution_chain ? <span>Yes</span> : <p>No</p>}</td>
                                    {/*<td>{pokemonSpecies.evolution_chain.url ? pokemonSpecies.evolution_chain.url : <span>None</span>}</td>*/}
                                </tr>
                            </tbody>
                        </table>
                        <h6>Pokemon Evolution Tree</h6>
                        {pokemonSpecies.evolves_from_species && pokemonSpecies.evolution_chain ? <p>A {pokemonSpecies.name} evolves from {pokemonSpecies.evolves_from_species.name} - {pokemonSpecies.evolves_from_species.url}</p> : <p>A {pokemonSpecies.name} is the first species in the evolution chain.</p>}
                        {pokemonSpecies.evolution_chain ? <table className='container table table-striped border'>
                            <thead>
                                <tr>
                                    <th>Grouping</th>
                                    <th>Name</th>
                                    {/*<th>URL</th>*/}
                                    <th>Evolution Trigger</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*console.log("Pokemon evolution chain")}
                                {console.log(evolutionChain)*/}
                                <tr>
                                    <td>1st</td>
                                    <td>
                                        <Link to={`/pokemon/${evolutionChain.species.name}`}>{evolutionChain.species.name}</Link>
                                    </td>
                                    {/*<td>{evolutionChain.chain.species.name}</td>
                                    <td>{evolutionChain.chain.species.url}</td>*/}
                                    <td>--</td>
                                    <td>This pokemon evolves to the rest in the list.</td>
                                </tr>
                                {/* 2nd Evolutions - possibly some bugs here */}
                                {evolutionChain.evolves_to.map((pokemon, index) => {
                                    return (<tr key={index}>
                                        <td>2nd</td>
                                        <td>
                                            <Link to={`/pokemon/${pokemon.species.name}`}>{pokemon.species.name}</Link>
                                        </td>
                                        {/*<td>{pokemon.species.name}</td>
                                        <td>{pokemon.species.url}</td>*/}
                                        <td>{pokemon.evolution_details[0].trigger.name}</td>
                                        <td>Needs {pokemon.evolution_details[0].min_level ? <span>to be at level {pokemon.evolution_details[0].min_level} to evolve into {pokemon.species.name}</span> : null}.</td>
                                    </tr>)
                                })}
                                {/* 3rd Evolution - possibly lots of bugs here */}
                                {evolutionChain.evolves_to[0].evolves_to.map((pokemon, index) => {
                                    return (<tr key={index}>
                                        <td>3rd</td>
                                        <td>
                                            <Link to={`/pokemon/${pokemon.species.name}`}>{pokemon.species.name}</Link>
                                        </td>
                                        {/*<td>{pokemon.species.name}</td>
                                        <td>{pokemon.species.url}</td>*/}
                                        <td>{pokemon.evolution_details[0].trigger.name}</td>
                                        <td>Needs {pokemon.evolution_details[0].min_level ? <span>to be at level {pokemon.evolution_details[0].min_level} to evolve into {pokemon.species.name}</span> : null}.</td>
                                    </tr>)
                                })}
                            </tbody>
                        </table> : <p>There is no evolution table for {pokemonSpecies.name}.</p>}
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