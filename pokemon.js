#!/usr/bin/env node 
 import { program } from "commander";
 import PokeAPI from "pokedex-promise-v2";
// async function getPokemons(){
//   const response=await fetch("https://pokeapi.co/api/v2/pokemon/venusaur");
//   const data=await response.json();
//   console.log(data.results.name);
//   return data;
// }
// getPokemons();
  async function getMovesPlayers(name){
    const P = new PokeAPI();
    const response=await P.getPokemonByName(name);
    const moves=await response.moves.slice(0,5);
    return moves;
  }
  
//  const data=await getMovesPlayers(25);
//   console.log(data);
function generateRandomPlayerId(){
  return Math.random()*(max-min+1)+min;
}
async function getMovesBot(name){
  const randomPlayerId=generateRandomPlayerId();
  const P = new PokeAPI();
  const response=await P.getPokemonByName(name);
  const moves=await response.moves.slice(0,5);
  return moves;
}
//   program
//   .description('Greet someone with their name and age')
//   .option('-p, --player <player>', 'Name of the person to greet') //<name> is essential as option attribute
//   .action((options) => {
//     const P = new PokeAPI();
//     P.getPokemonByName(options.player) // You can also use an ID like 25 for Pikachu
//       .then((response) => {
//         console.log(response.moves.slice(0,1)); // Output the Pokémon data
//       })
//   });
// program.parse(process.argv);