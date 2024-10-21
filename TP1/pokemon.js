#!/usr/bin/env node
import { program } from "commander";
import PokeAPI from "pokedex-promise-v2";

// Function to get the player's chosen Pokémon moves
async function getMovesPlayers(name) {
  const P = new PokeAPI();
  const response = await P.getPokemonByName(name);
  const moves = response.moves.slice(0, 5).map(move => ({
    name: move.move.name,
    accuracy: move.move.accuracy,
    power: move.move.power,
    pp: move.move.pp
  }));
  return moves;
}

// Function to generate a random bot Pokémon ID
function generateRandomPlayerId() {
  const max = 898; // Max number of Pokémon in PokeAPI
  const min = 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to get the bot's Pokémon moves
async function getMovesBot() {
  const P = new PokeAPI();
  const randomPlayerId = generateRandomPlayerId();
  const response = await P.getPokemonById(randomPlayerId);
  const moves = response.moves.slice(0, 5).map(move => ({
    name: move.move.name,
    accuracy: move.move.accuracy,
    power: move.move.power,
    pp: move.move.pp
  }));
  return moves;
}

// Function to simulate a move with accuracy and power
function performMove(move, enemyMove) {
  if (move.pp <= 0) {
    console.log(`${move.name} has no PP left! Move failed.`);
    return 0;
  }
  const hitChance = Math.random() * 100;
  if (hitChance <= move.accuracy) {
    const damage = move.power - (enemyMove.power || 0); // Basic calculation
    console.log(`${move.name} hit! Damage: ${damage}`);
    return Math.max(damage, 0);
  } else {
    console.log(`${move.name} missed!`);
    return 0;
  }
}

// Battle function between player and bot
async function battle(playerPokemonName) {
  const playerMoves = await getMovesPlayers(playerPokemonName);
  const botMoves = await getMovesBot();

  let playerHp = 100;
  let botHp = 100;

  while (playerHp > 0 && botHp > 0) {
    // Player's turn
    const playerMove = playerMoves[Math.floor(Math.random() * playerMoves.length)];
    const botMove = botMoves[Math.floor(Math.random() * botMoves.length)];
    const damageToBot = performMove(playerMove, botMove);
    botHp -= damageToBot;

    if (botHp <= 0) {
      console.log("Player wins!");
      break;
    }

    // Bot's turn
    const damageToPlayer = performMove(botMove, playerMove);
    playerHp -= damageToPlayer;

    if (playerHp <= 0) {
      console.log("Bot wins!");
    }

    console.log(`Player HP: ${playerHp}, Bot HP: ${botHp}`);
  }
}

// Commander program to initiate the game
program
  .description('Start a Pokémon battle')
  .option('-p, --player <player>', 'Choose your Pokémon')
  .action((options) => {
    battle(options.player)
      .then(() => console.log('Battle completed'))
      .catch(err => console.error(err));
  });

program.parse(process.argv);
