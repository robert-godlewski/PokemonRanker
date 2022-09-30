# Description
This is a MERN application uses the pokeapi to rank pokemon based off of several conditions.
* Uses pokemon api to gather the information needed and stores temporary data in a cache.
* Ranks what traits and stats are the best for each Pokemon Species; Health Points, Attack, Defense, Speed, Special Defense, Special Attack, EVs, IVs, Nature.
* Rankings against other Pokemon in battles based off of type(s), moves, defence.
* Uses conditional based off of user prefernces and limits per game (to help narrow down the searching options).

So far the only thing that this app does is access the api to gather the information on each pokemon.

# Sources
* Documentation for Pokeapi: https://pokeapi.co/docs/v2
* api testing grounds: https://pokeapi.co/
* from a previous project I did for Coding Dojo: https://github.com/robert-godlewski/pokemon_api.git

# API Notes
For all pokedexes do https://pokeapi.co/api/v2/pokedex/?limit=30, the results are stored in res.data.results is an array of objects.  Within each indexed object:
{
    "name": ...str name of the pokedex...,
    "url": "https//pokeapi.co/api/v2/pokedex/...id number of pokedex..."
}

For each pokedex call use the id number of the pokedex and do https://pokeapi.co/api/v2/pokedex/id, the results are stored in res.data.results:
{
    "descriptions": [...],
    "id": ...an int of the pokedex...,
    "is_main_series": true/ false,
    "name": ...str name of the pokedex...,
    "names": [...a list of names of the pokedex in different languages...],
    "pokemon_entries": [
        {
            "entry_number": ...int related to the pokemon...,
            "pokemon_species": {
                "name": ...str name of the pokemon...,
                "url": "https://pokeapi.co/api/v2/pokemon-species/{'pokemon id number'}/"
            }
        },
        ...multiple indexes of objects that repeat before...,
    ],
    "region": null or {
        "name": ...str name of the region...,
        "url": "https://pokeapi.co/api/v2/region/{id number for the region}/"
    },
    "version_groups": null or [
        {
            "name": ...str name of the game version...,
            "url": "https://pokeapi.co/api/v2/version-group/{id of the version group}/"
        },
        ...nultiple indexes of objects that repeat before...
    ]
}

For each pokemon-species call use the pokemon id number from the national pokedex (or the name of the pokemon) and do https://pokeapi.co/api/v2/pokemon-species/{id or name}, the res.data.results are: {
    ...,
    "evolution_chain": {"url": "https://pokeapi.co/api/v2/evolution-chain/{id of evolution chain}/"},
    "evolves_from_species": null or {
        "name": ...str name of the pokemon prior to this one...,
        "url": "https://pokeapi.co/api/v2/pokemon-species/{'pokemon id number of prior evolution'}/"
    },
    ...,
    "generation": {
        "name": "generation-{roman numeral in lowercase here}",
        "url": "https://pokeapi.co/api/v2/generation/{generation number same as roman numeral}/"
    },
    ...,
    "id": ...int id of the pokemon...,
    ...,
    "name": ...str name of the pokemon...,
    ...,
    "pokedex_numbers": [
        {
            "entry_number": ...int id number in the specified pokedex...,
            "pokedex": {
                "name": ...str name of the pokedex...,
                "url": "https://pokeapi.co/api/v2/pokedex/{pokedex id number}/"
            }
        },
        ...,
    ],
    ...,
    "varieties":
}

For each region call use the id number for the region (or the name of the region) and do https://pokeapi.co/api/v2/region/{id or region name}, the res.data.results are: {...}

For each version group call use the version-group id number and do https://pokeapi.co/api/v2/version-group/id, the res.data.results are: {...}

# Todos
1. Implement a cache
2. fix the bugs - Ongoing
3. create a view of the different types (with links) and provides a list of pokemon
4. figure out a way to implement a way to determine which stats should be optimized for each pokemon
5. figure out a way to tell what the pokemon is weak, strong, average, no effect based on which pokemon (use types)
6. add in A-frames framework to make the sprites jump up and down
7. create a mongodb database so that it holds gym leaders and their pokemon.

# Bugs to fix
List of bugs that I have to fix in View Pokemon:
* The pokemon index numbers when you choose a different pokedex (only National Dex works!)
* Sprites crashing the webpage sometimes; especially if you reload the app
* Account for the species difference in each region - 
- Gen1: ratattata-raticate (2x), raichu (2x), sandshrew (2x), vulpix (2x), diglett (2x), meowth (3x), growlithe-arcanine (2x), geodude-graveler-golem (2x), ponyta-rapidash (2x), slowpoke-slowbro-slowking (2x), farfetch'd (2x), grimer-muk (2x), voltorb-electrode (2x), exeggutor (2x), marowak (2x), weezing (2x), mr. mime (2x), articuno (2x), zapdos (2x), moltres (2x)
- Gen2: typlosion (2x), qwilfish (2x), sneasel (2x), corsola (2x)
- Gen3: zigzagoon-linoone (2x), castform (3x), deoxys (4x)
- Gen4: burmy-wormadam (3x), shellos-gasttrodon (2x), rotom (6x), giratina (2x)
- Gen5: samurott (2x), unfezant (2x), lilligant (2x), basculin (3x), darumaka (2x), darmanitan (4x), yamask (2x), zorua-zoroark (2x), frillish-jellicent (2x), stunfisk (2x), braviary (2x), meloetta (2x)
- Gen6: sliggoo-goodra (2x), avalugg (2x), hoopa (2x)
- Gen7: decidueye (2x), oricorio (4x)
* evolution_details can have more than 1 index in the list - look at mangnezone (gen4), leafeon (gen4), glaceon (gen4), sylveon (gen6)
* other evolution triggers found in evolution details - update when needed

# Flushed out todos for Types View
