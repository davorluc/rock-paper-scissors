/*
 * You are allowed to change the code here.
 * However, you are not allowed to change the signature of the exported functions and objects.
 */
import {table} from './main.js';

export const DELAY_MS = 1000;
const playerStats = {
  Markus: {
    user: 'Markus',
    win: 3,
    lost: 6,
  },
  Michael: {
    user: 'Michael',
    win: 4,
    lost: 5,
  },
  Lisa: {
    user: 'Lisa',
    win: 4,
    lost: 5,
  },
};

// TODO: Update this function to do the right thing
function getRankingsFromPlayerStats() {
    const playersSorted = Objects.values(playerStats).sort((x, y) => y.win - x.win);
    const ranks = [];
    for (let i = 0; i < playersSorted.length; i++) {
        const user = playersSorted[i];
        const wins = user.win;
        const name = user.user;
        const rank = index + 1;
        rankings.push({ rank, wins, name });
    }
    return ranks;
}

export const HANDS = ["rock", "paper", "scissors", "fountain", "matchstick"];

let isConnectedState = false;

export function setConnected(newIsConnected) {
  isConnectedState = Boolean(newIsConnected);
}

export function isConnected() {
  return isConnectedState;
}

export function getRankings(rankingsCallbackHandlerFn) {
  const rankingsArray = getRankingsFromPlayerStats();
  setTimeout(() => rankingsCallbackHandlerFn(rankingsArray), DELAY_MS);
}

const evalLookup = {
  scissors: {
    scissors: 0,
    stone: 1,
    paper: -1,
  },
};

function getGameEval(playerHand, systemHand) {
  return evalLookup[playerHand][systemHand];
}

console.log('eval scissors-scissors: ', getGameEval('scissors', 'scissors'));

function generateComputerPick() {
    const randomPick = Math.floor(Math.random() * 5);
    return HANDS[randomPick];
}


export function addToTable(result, userInput, computerInput) {
    let template = `
                <tr>
                    <td>${result}</td>
                    <td>${userInput}</td>
                    <td>${computerInput}</td>
                </tr>
    `
    table.innerHTML += template;
}

export function evaluateHand(playerName, playerHand, gameRecordHandlerCallbackFn) {
  // TODO: Replace calculation of didWin and update rankings while doing so.
  // optional: in local-mode (isConnected == false) store rankings in the browser localStorage https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
    const systemHand = generateComputerPick();
    let gameEval = 0;
    switch(playerHand + systemHand) {
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
            gameEval = 1;
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
            gameEval = -1;
            break;
        case "rockrock":
        case "paperpaper":
        case "scissorsscissors":
        case "fountainfountain":
        case "matchstickmatchstick":
            gameEval = 0;
            break;
    }
    setTimeout(() => gameRecordHandlerCallbackFn({
        playerHand,
        systemHand,
        gameEval,
    }), DELAY_MS);
    return gameEval;
}
