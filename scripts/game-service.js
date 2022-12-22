/*
 * You are allowed to change the code here.
 * However, you are not allowed to change the signature of the exported functions and objects.
 */

// Declarinng our delay in ms
export const DELAY_MS = 1000;

// Starting ranklist for local version
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

// Initial state of isConnectedState
let isConnectedState = false;

// Function that changes the value of isConnectedState
export function setConnected(newIsConnected) {
  isConnectedState = Boolean(newIsConnected);
}

// Function that determines the state of isConnected State
export function isConnected() {
  return isConnectedState;
}

// returns playerStats as an array
function returnPlayerStatsAsArray() {
    return Object.entries(playerStats);
}

// Function that sorts the ranklist
function sortRankings(players) {
    let rank = 1;
    const sortedPlayerStats = players.sort((a, b) => b[1].win - a[1].win);
    sortedPlayerStats.forEach((player) => {
        player.rank = rank;
        rank++;
    });
    return sortedPlayerStats;
}

// Function that gets the rankings from playerStats (has to be async because of server version)
async function getRankingsFromPlayerStats() {
    // uses function to save playerStats in a variable
    let unsortedPlayerStats = returnPlayerStatsAsArray();
    if (isConnected()) {
        unsortedPlayerStats = await fetch('https://stone.sifs0005.infs.ch/ranking', {
            method: 'GET', // fetches data from server
        // takes the response and turns it to a json and then into an object
        }).then((response) => response.json()).then((ranking) => Object.entries(ranking));
    }
    // returns sorted ranklist
    return sortRankings(unsortedPlayerStats);
}

// Array of available Hands
export const HANDS = ['Schere', 'Stein', 'Papier', 'Brunnen', 'Streichholz'];

// will be needed in main.js to update rankings
export async function getRankings(rankingsCallbackHandlerFn) {
  const rankingsArray = await getRankingsFromPlayerStats();
  setTimeout(() => rankingsCallbackHandlerFn(rankingsArray), DELAY_MS);
}

// Lookup for game evaluation
const evalLookup = {
    Schere: {
        Schere: 0,
        Stein: -1,
        Papier: 1,
        Brunnen: -1,
        Streichholz: 1,
    },

    Papier: {
        Schere: -1,
        Stein: 1,
        Papier: 0,
        Brunnen: 1,
        Streichholz: -1,
    },

    Stein: {
        Stein: 0,
        Papier: -1,
        Schere: 1,
        Brunnen: -1,
        Streichholz: 1,
    },

    Brunnen: {
        Schere: 1,
        Papier: -1,
        Stein: 1,
        Brunnen: 0,
        Streichholz: -1,
    },

    Streichholz: {
        Stein: -1,
        Papier: 1,
        Schere: -1,
        Brunnen: 1,
        Streichholz: 0,
    },
};

//  function that evaluates the game with the help of the lookup table above
function getGameEval(playerHand, systemHand) {
  return evalLookup[playerHand][systemHand];
}

// Function that generates a random hand for the computer/system
function generateComputerPick() {
    const randomPick = Math.floor(Math.random() * 5);
    return HANDS[randomPick];
}

// function that adds an entry if the player doesn't exist yet
function updatePlayerStats(playerName, gameEval) {
// eslint-disable-next-line @web-and-design/wed/use-action-map
    if (playerStats[playerName] === undefined) {
        playerStats[playerName] = {
            user: `${playerName}`,
            win: 0,
            lost: 0,
        };
    }

    if (gameEval > 0) {
        playerStats[playerName].win += gameEval;
    } else {
        playerStats[playerName].lost -= gameEval;
    }
}

// function that evaluates the game
export async function evaluateHand(playerName, playerHand, gameRecordHandlerCallbackFn) {
  // TODO: Replace calculation of didWin and update rankings while doing so.
  // optional: in local-mode (isConnected == false) store rankings in the browser localStorage https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
    let systemHand = generateComputerPick();
    let gameEval = getGameEval(playerHand, systemHand);

    if (isConnected()) {
        await fetch(`https://stone.sifs0005.infs.ch/play?playerName=${playerName}&playerHand=${playerHand}`, {
            method: 'GET'}).then((response) => response.json()).then((game) => {
                systemHand = game.choice;
                if (game.win === undefined) {
                  gameEval = 0;
                } else {
                  gameEval = game.win ? 1 : -1;
                }
            });
        gameRecordHandlerCallbackFn({
            playerHand,
            systemHand,
            gameEval,
        });
    } else {
    updatePlayerStats(playerName, gameEval);
    setTimeout(() => gameRecordHandlerCallbackFn({
        playerHand,
        systemHand,
        gameEval,
    }), DELAY_MS);
    }
}
