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
    let rank = 0;
    let userWins = -1;
    players.forEach((player) => {
        if (player[1].win !== userWins) {
            rank++;
            userWins = player[1].win;
        }
        player.rank = rank;
    });
}

function getRankingsFromPlayerStats() {
    const unsortedPlayerStats = returnPlayerStatsAsArray();
    const sortedPlayerStats = unsortedPlayerStats.sort((a, b) => b[1].win - a[1].win);
    sortRankings(unsortedPlayerStats);
    return sortedPlayerStats.slice(0, 10);
}

export const HANDS = ['Rock', 'Paper', 'Scissors', 'Fountain', 'Matchstick'];

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
    Scissors: {
        Scissors: 0,
        Rock: -1,
        Paper: 1,
        Fountain: -1,
        Matchstick: 1,
    },

    Paper: {
        Scissors: -1,
        Rock: 1,
        Paper: 0,
        Fountain: 1,
        Matchstick: -1,
    },

    Rock: {
        Rock: 0,
        Paper: -1,
        Scissors: 1,
        Fountain: -1,
        Matchstick: 1,
    },

    Fountain: {
        Scissors: 1,
        Paper: -1,
        Rock: 1,
        Fountain: 0,
        Matchstick: -1,
    },

    Matchstick: {
        Rock: -1,
        Paper: 1,
        Scissors: -1,
        Fountain: 1,
        Matchstick: 0,
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

export function evaluateHand(playerName, playerHand, gameRecordHandlerCallbackFn) {
  // TODO: Replace calculation of didWin and update rankings while doing so.
  // optional: in local-mode (isConnected == false) store rankings in the browser localStorage https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
    const systemHand = generateComputerPick();
    const gameEval = getGameEval(playerHand, systemHand);
    updatePlayerStats(playerName, gameEval);
    setTimeout(() => gameRecordHandlerCallbackFn({
        playerHand,
        systemHand,
        gameEval,
    }), DELAY_MS);
}
