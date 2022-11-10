import {HANDS, isConnected, getRankings, evaluateHand} from './game-service.js';
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

function generateComputerPick() {
    const picks = ["rock", "paper", "scissors", "fountain", "matchstick"];
    const randomPick = Math.floor(Math.random() * 5);
    return picks[randomPick];
}

function duel(userPick) {
    const computerPick = generateComputerPick();
    switch(userPick + computerPick) {
        case "rockscissors":
        case "rockmatchstick":
        case "paperrock":
        case "paperfountain":
        case "scissorspaper":
        case "scissorsmatchstick":
        case "fountainrock":
        case "fountainscissors":
        case "matchstickpaper":
        case "matchstickfountain":
            console.log("you won");
            break;
        case "rockpaper":
        case "rockfountain":
        case "paperscissors":
        case "papermatchstick":
        case "scissorsrock":
        case "scissorsfountain":
        case "fountainpaper":
        case "fountainmatchstick":
        case "matchstickrock":
        case "matchstickscissors":
            console.log("you lost");
            break;
        case "rockrock":
        case "paperpaper":
        case "scissorsscissors":
        case "fountainfountain":
        case "matchstickmatchstick":
            console.log("draw");
            break;
    }
}

function main() {
    rock.addEventListener('click', function () {
        duel("rock");
    })

    paper.addEventListener('click', function () {
        duel("paper");
    })

    scissors.addEventListener('click', function () {
        duel("scissors");
    })

    fountain.addEventListener('click', function () {
        duel("fountain");
    })
    matchstick.addEventListener('click', function () {
        duel("matchstick");
    })
}
main();
