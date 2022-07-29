# Description
This is a MERN application uses the pokeapi to rank pokemon based off of several conditions.
* Uses pokemon api to gather the information needed.
* Ranks what traits and stats are the best for each Pokemon Species; Health Points, Attack, Defense, Speed, Special Defense, Special Attack, EVs, IVs, Nature.
* Rankings against other Pokemon in battles based off of type(s), moves, defence.
* Uses conditional based off of user prefernces and limits per game (to help narrow down the searching options).

So far the only thing that this app does is access the api to gather the information on each pokemon.

# Sources
* Documentation for Pokeapi: https://pokeapi.co/docs/v2
* api testing grounds: https://pokeapi.co/
* from a previous project I did for Coding Dojo: https://github.com/robert-godlewski/pokemon_api.git

# Todos
1. fix the bugs - Ongoing
2. create a view of the different types (with links) and provides a list of pokemon
3. figure out a way to implement a way to determine which stats should be optimized for each pokemon
4. figure out a way to tell what the pokemon is weak, strong, average, no effect based on which pokemon (use types)
5. add in A-frames framework to make the sprites jump up and down
6. create a mongodb database so that it holds gym leaders and their pokemon.

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
