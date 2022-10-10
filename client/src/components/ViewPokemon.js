// JS Libraries
import React, {useState} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import {useQuery} from 'react-query';

// Components
import NavBar from './NavBar';


const ViewPokemon = (props) => {
    const {id} = useParams();
    //const {pokemon, setPokemon} = props;

    // Needed data variables, each one has an api call
    const [pokemonSpecies, setPokemonSpecies] = useState({});

    // For evolutions
    const [evolutionNum, setEvolutionNum] = useState("");
    const [evolutionChain, setEvolutionChain] = useState({});
    //const [evolutionNums, setEvolutionNums] = useState([]);

    // For variations
    const [variation, setVariation] = useState("");
    const [pokemonStats, setPokemonStats] = useState({});

    // Notifier in the Console
    console.log(`Loading ${id} stats`)

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

    // Caching the data from the initial call
    const [loading, setLoading] = useState(true);

    // Multiple api request
    /*
    const resultsF = useQuery(`pokemon-${id}`, () => {
        var info = {};
        info['species'] = axios.get().then().catch();
        info['evol_chain'] = axios.get().then().catch();
        info['stats'] = axios.get().then().catch();
        return info;
    });
    */

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

            // Saving current api request
            setPokemonSpecies(res.data);
            setLoading(false);

            // Grabbing the Evolution Chain number as a str
            console.log("Evolution Chain:");
            //console.log(res.data.evolution_chain);
            //console.log(res.data.evolution_chain.url);
            let evc_id = EVC_id(res.data.evolution_chain.url);
            //console.log(evc_id);
            setEvolutionNum(evc_id);

            // To get the stats - need to see for all pokemon though
            console.log("Variations for this pokemon:");
            console.log(res.data.varieties);
            console.log("Variation 1:");
            console.log(res.data.varieties[0]);
            if (res.data.varieties[0].id_default) {
                setVariation("default");
            } else {
                setVariation("variation1");
            };
            //console.log(res.data.varieties[0].pokemon);
            //console.log(res.data.varieties[0].pokemon.url);
            //PokemonStats(res.data.varieties[0].pokemon.url);
            //console.log("Variation 2:");
            //console.log(res.data.varieties[1]);
            console.log("------------------");
        })
        .catch((err) => {
            console.log(err);
            setLoading(true);
        });
    });
    console.log("Species Results:");
    console.log(results);

    // For getting the evolution chain and keeping it in the cache - a little buggy here
    const evolution_results = useQuery(`evolution-chain-${evolutionNum}`, () => {
        if (evolutionNum === "") {
            console.log("Default page details will not work here.");
            setEvolutionChain([]);
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

    // For getting details of each variation and caching the data.
    // By default caches the first one.
    // There are probably bugs here
    const pokemon_variation = useQuery(`pokemon-${id}-${variation}`, () => {
        let url = `https://pokeapi.co/api/v2/pokemon/${id}`
        // Call probably doesn't work right
        return axios.get(url).then((res) => {
            console.log("All of the data about pokemon (via variation):");
            console.log(res.data);
            // Saving the data
            setPokemonStats(res.data);
            console.log("------------------");
        })
        .catch((err) => {
            console.log(err);
            setLoading(true);
        });
    });
    console.log("Pokemon Variation Results:");
    console.log(pokemon_variation);

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
                        {pokemonSpecies.is_baby ? <p>This pokemon is a baby species.</p> : null}
                        {pokemonSpecies.is_legendary ? <p>This is a legendary pokemon.</p> : null}
                        {pokemonSpecies.is_mythical ? <p>This is a mythical pokemon.</p> : null}
                        {!pokemonSpecies.is_baby && !pokemonSpecies.is_legendary && !pokemonSpecies.is_mythical ? <p>No special indicators for this pokemon.</p> : null}
                        {pokemonStats.base_experience ? <p>Will get {pokemonStats.base_experience} xp after defeating {id}.</p> : null}
                        {pokemonSpecies.evolves_from_species ? <p>This pokemon evolves from <Link to={`/pokemon/${pokemonSpecies.evolves_from_species.name}`}>{pokemonSpecies.evolves_from_species.name}</Link></p> : null}
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
                                    {/* There is a bug here for everytime a new load happens */}
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
                        {pokemonStats.sprites ? <div className='container row'>
                            {pokemonStats.sprites.front_female || pokemonStats.sprites.front_shiny ? <div>
                                <h5>{pokemonStats.sprites.front_female ? <span>Male Version</span> : <span>Default Version</span>}</h5>
                                <img src={pokemonStats.sprites.front_default} alt='default front view'/>
                                <img src={pokemonStats.sprites.back_default} alt='default back view'/>
                            </div> : <div>
                                <h5>Main Version</h5>
                                <img src={pokemonStats.sprites.front_default} alt='front view'/>
                                <img src={pokemonStats.sprites.back_default} alt='back view'/>
                            </div>}
                            {pokemonStats.sprites.front_female ? <div>
                                <h5>Female Version</h5>
                                <img src={pokemonStats.sprites.front_female} alt='Female front view'/>
                                <img src={pokemonStats.sprites.back_female} alt='Female back view'/>
                            </div> : null}
                            {pokemonStats.sprites.front_shiny ? <div>
                                <h5>Shiny Version</h5>
                                <img src={pokemonStats.sprites.front_shiny} alt='Shiny front view'/>
                                <img src={pokemonStats.sprites.back_shiny} alt='Shiny back view'/>
                            </div> : null}
                            {pokemonStats.sprites.front_shiny_female ? <div>
                                <h5>Shiny Version</h5>
                                <img src={pokemonStats.sprites.front_shiny_female} alt='Shiny female front view'/>
                                <img src={pokemonStats.sprites.back_shiny_female} alt='Shiny female back view'/>
                            </div> : null}
                        </div> : <p>No Sprites available</p>}
                    </div>
                    {/* Base Stats */}
                    <div className='border'>
                        <h5>Base Stats</h5>
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
                                        <td>
                                            <Link to={`/pokedex/${dex.pokedex.name}`}>
                                                {dex.pokedex.name}
                                            </Link>
                                        </td>
                                        {/*<td>{dex.pokedex.name}</td>*/}
                                        <td>{dex.entry_number}</td>
                                        {/*<td>{dex.pokedex.url}</td>*/}
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                        <h6>Types</h6>
                        {pokemonStats.types ? <table className='container table table-striped border'>
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>URL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pokemonStats.types.map((type, index) => {
                                    return (<tr key={index}>
                                        {/*<td><Link to={}></Link></td>*/}
                                        <td>{type.type.name}</td>
                                        <td>{type.type.url}</td>
                                    </tr>)
                                })}
                            </tbody>
                        </table> : <p>Please Reload to get type info.</p>}
                        <h6>Gender Ratio</h6>
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
                        <h6>Size</h6>
                        {pokemonStats.height && pokemonStats.weight ? <table className='container table table-striped border'>
                            <thead>
                                <tr>
                                    <th>Units</th>
                                    <th>height</th>
                                    <th>Weight</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Metric</td>
                                    <td>{parseInt(pokemonStats.height)*10} cm</td>
                                    <td>{parseInt(pokemonStats.weight)*0.1} kg</td>
                                </tr>
                                <tr>
                                    <td>Imperial</td>
                                    <td>{parseInt(pokemonStats.height)*0.3} ft</td>
                                    <td>{parseInt(pokemonStats.weight)*0.2} lbs</td>
                                </tr>
                            </tbody>
                        </table> : <p>Please Reload for the size measurements</p>}
                        <h6>Abilities</h6>
                        {pokemonStats.abilities ? <table className='container table table-striped border'>
                            <thead>
                                <tr>
                                    <th>Abilities</th>
                                    <th>Hidden?</th>
                                    <th>URL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pokemonStats.abilities.map((ability, index) => {
                                    return (<tr key={index}>
                                        {/* Turn the name to a link to go to the url */}
                                        <td>{ability.ability.name}</td>
                                        <td>{ability.is_hidden ? <span>Yes</span> : <span>No</span>}</td>
                                        <td>{ability.ability.url}</td>
                                    </tr>)
                                })}
                            </tbody>
                        </table> : <p>Please Reload for the Abilities.</p>}
                        <h6>Base Stats - neutral natures</h6>
                        {pokemonStats.stats ? <table className='container table table-striped border'>
                            <thead>
                                <th>Stat</th>
                                <th>Stat URL</th>
                                <th>Base Experience</th>
                                <th>EV - Effort Value</th>
                            </thead>
                            <tbody>
                                {pokemonStats.stats.map((stat, index) => {
                                    return (<tr key={index}>
                                        <td>{stat.stat.name}</td>
                                        <td>{stat.stat.url}</td>
                                        <td>{stat.base_stat}</td>
                                        <td>{stat.effort}</td>
                                    </tr>)
                                })}
                            </tbody>
                        </table> : <p>Please Reload for the Stats.</p>}
                    </div>
                    {/* Raising and Evolving pokemon */}
                    <div className='border'>
                        <h5>Raising</h5>
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
                        {evolutionChain ? <table className='container table table-striped border'>
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
            </div>
            {/* Moving through National dex order *}
            <div>
                <h3>In National Pokedex Order</h3>
                {parseInt(pokemon.id)-1 > 0 ? <span><Link to={`/pokemon/${parseInt(pokemon.id)-1}`}>previous</Link> | </span> : null}
                <Link to={`/pokemon/${parseInt(pokemon.id)+1}`}>next</Link>
            </div>
            {**/}
        </>
    );
};


export default ViewPokemon;