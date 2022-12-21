/*
 * You are allowed to change the code here.
 * However, you are not allowed to change the signature of the exported functions and objects.
 */

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

function returnPlayerStatsAsArray() {
    return Object.entries(playerStats);
}

function sortRankings(players) {
    let rank = 1;
    let userWins = -1;
    const sortedPlayerStats = players.sort((a, b) => b[1].win - a[1].win);
    sortedPlayerStats.forEach((player) => {
        player.rank = rank;
        rank++;
    });
    return sortedPlayerStats;
}

async function getRankingsFromPlayerStats() {
    let unsortedPlayerStats = returnPlayerStatsAsArray();
    if(isConnected()) {
        unsortedPlayerStats = await fetch('https://stone.sifs0005.infs.ch/ranking', {
            method: 'GET'
        }).then((response) => response.json()).then((ranking) => Object.entries(ranking));
    }
    return sortRankings(unsortedPlayerStats);
}

export const HANDS = ['Schere', 'Stein', 'Papier', 'Brunnen', 'Streichholz'];

let isConnectedState = false;

export function setConnected(newIsConnected) {
  isConnectedState = Boolean(newIsConnected);
}

export function isConnected() {
  return isConnectedState;
}

export async function getRankings(rankingsCallbackHandlerFn) {
  const rankingsArray = await getRankingsFromPlayerStats();
  setTimeout(() => rankingsCallbackHandlerFn(rankingsArray), DELAY_MS);
}

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

function getGameEval(playerHand, systemHand) {
  return evalLookup[playerHand][systemHand];
}

function generateComputerPick() {
    const randomPick = Math.floor(Math.random() * 5);
    return HANDS[randomPick];
}

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
