import {HANDS, isConnected, getRankings, evaluateHand, addToTable} from './game-service.js';
// TODO: Create DOM references
// TODO: How to keep track of App state?

// TODO: Create View functions

// TODO: Register Event Handlers

// TODO: Replace the following demo code. It should not be included in the final solution

// Following part is commented out for now, trying to fing my own solution.
/*
console.log('isConnected:', isConnected());

getRankings((rankings) => rankings.forEach((rankingEntry) => console.log(
  `Rank ${rankingEntry.rank} (${rankingEntry.wins} wins): ${rankingEntry.players}`,
)));

function pickHand() {
  const handIndex = Math.floor(Math.random() * 3);
  return HANDS[handIndex];
}

let count = 1;

function printWinner(hand, didWin) {
  console.log(count++, hand, didWin);
}

for (let i = 1; i < 10; i++) {
  const playerHand = pickHand();
  evaluateHand('peter', playerHand,
    ({
       systemHand,
       gameEval,
     }) => printWinner(playerHand, systemHand, gameEval));
}
*/

const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const fountain = document.getElementById("fountain");
const matchstick = document.getElementById("matchstick");
const logoutButton = document.getElementById("back");
const loginButton = document.getElementById("buttonEnter");
let name = document.getElementById("user-input");
export let table = document.getElementById("currentgame");
let prompt = document.getElementById("pick-your-hand");
let isLoggedIn = false;

function generateDrawText() {
    const inputName = name.value;
    const template = `
       ${inputName}, pick your hand!
        `;
    prompt.innerHTML += template;
}

function login() {
    const username = name.value;

    if (username) {
        document.querySelector("#game").classList.toggle("hidden");
        document.querySelector("#scoreboard").classList.toggle("hidden");
        document.querySelector("#login").classList.toggle("hidden");
    }
}

function logout() {
        document.querySelector("#game").classList.toggle("hidden");
        document.querySelector("#scoreboard").classList.toggle("hidden");
        document.querySelector("#login").classList.toggle("hidden");
}

function main() {
    loginButton.addEventListener('click', function() {
        generateDrawText();
        isLoggedIn = true;

        login();
    })

    logoutButton.addEventListener('click', function() {
        logout();
    })

    rock.addEventListener('click', function () {
        evaluateHand("placeholder", "rock", (evaluation) => {
            let result = "";
            if (evaluation.gameEval === 1) {
                result = "you won";
            } else if (evaluation.gameEval === -1) {
                result = "you lost";
            } else {
                result = "draw";
            }
        addToTable(result, evaluation.playerHand, evaluation.systemHand);
        })
    })

    paper.addEventListener('click', function () {
        evaluateHand("placeholder", "paper", (evaluation) => {
            let result = "";
            if (evaluation.gameEval === 1) {
                result = "you won";
            } else if (evaluation.gameEval === -1) {
                result = "you lost";
            } else {
                result = "draw";
            }
        addToTable(result, evaluation.playerHand, evaluation.systemHand);
        })
    })

    scissors.addEventListener('click', function () {
        evaluateHand("placeholder", "scissors", (evaluation) => {
            let result = "";
            if (evaluation.gameEval === 1) {
                result = "you won";
            } else if (evaluation.gameEval === -1) {
                result = "you lost";
            } else {
                result = "draw";
            }
        addToTable(result, evaluation.playerHand, evaluation.systemHand);
        })
    })

    fountain.addEventListener('click', function () {
        evaluateHand("placeholder", "fountain", (evaluation) => {
            let result = "";
            if (evaluation.gameEval === 1) {
                result = "you won";
            } else if (evaluation.gameEval === -1) {
                result = "you lost";
            } else {
                result = "draw";
            }
        addToTable(result, evaluation.playerHand, evaluation.systemHand);
        })
    })

    matchstick.addEventListener('click', function () {
        evaluateHand("placeholder", "matchstick", (evaluation) => {
            let result = "";
            if (evaluation.gameEval === 1) {
                result = "you won";
            } else if (evaluation.gameEval === -1) {
                result = "you lost";
            } else {
                result = "draw";
            }
        addToTable(result, evaluation.playerHand, evaluation.systemHand);
        })
    })
}
main();
