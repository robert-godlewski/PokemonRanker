# Description
This is a MERN application uses the pokeapi to rank pokemon based off of several conditions.
* Ranks what traits and stats are the best for each Pokemon Species; Health Points, Attack, Defense, Speed, Special Defense, Special Attack, EVs, IVs, Nature.
* Rankings against other Pokemon in battles based off of type(s), moves, defence.
* Uses pokemon api to gather the information needed.
* Uses conditional based off of user prefernces and limits per game.

# Sources
* Documentation for Pokeapi: https://pokeapi.co/docs/v2
* api testing grounds: https://pokeapi.co/
* from a previous project I did for Coding Dojo: https://github.com/robert-godlewski/pokemon_api.git

# Bugs to fix
List of bugs that I have to fix in View Pokemon:
1. Account for the species difference in each region - ratattata-raticate (2x), raichu (2x), sandshrew (2x), vulpix (2x), diglett (2x), meowth (3x), growlithe-arcanine (2x), geodude-graveler-golem (2x), ponyta-rapidash (2x), slowpoke-slowbro-slowking (2x), farfetch'd (2x), grimer-muk (2x), voltorb-electrode (2x), exeggutor (2x), marowak (2x), weezing (2x), mr. mime (2x), articuno (2x), zapdos (2x), moltres (2x), typlosion (2x), qwilfish (2x), sneasel (2x), corsola (2x), zigzagoon-linoone (2x), castform (3x), deoxys (4x), burmy-wormadam (3x), shellos-gasttrodon (2x), rotom (6x), giratina (2x), samurott (2x), unfezant (2x), lilligant (2x), basculin (3x), darumaka (2x), darmanitan (4x), yamask (2x), zorua-zoroark (2x), frillish-jellicent (2x), stunfisk (2x), braviary (2x), meloetta (2x), sliggoo-goodra (2x), avalugg (2x), hoopa (2x), decidueye (2x), oricorio (4x), etc.
2. evolution_details can have more than 1 index in the list - look at mangnezone
