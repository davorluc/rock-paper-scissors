import {HANDS, isConnected, getRankings, evaluateHand, addToTable} from './game-service.js';
// TODO: Create DOM references
// TODO: How to keep track of App state?

// TODO: Create View functions

// TODO: Register Event Handlers

// TODO: Replace the following demo code. It should not be included in the final solution

const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');
const fountain = document.getElementById('fountain');
const matchstick = document.getElementById('matchstick');
const logoutButton = document.getElementById('back');
const loginButton = document.getElementById('buttonEnter');
const name = document.getElementById('user-input');
export const table = document.getElementById('currentgame');
const prompt = document.getElementById('pick-your-hand');
const ranklist = document.getElementById('scoreboard-body');
let isLoggedIn = false;

function createRanking(rankingEntry) {
    const template = `
        <tr>
            <td>${rankingEntry.rank}</td>
            <td>${rankingEntry.name}</td>
            <td>${rankingEntry.wins}</td>
        </tr>
    `;
    return template;
}

getRankings((rankings) => rankings.forEach((rankingEntry) => {
    ranklist.innerHTML += (createRanking(rankingEntry));
}));

function generateDrawText() {
    const inputName = name.value;
    const template = `
       ${inputName}, pick your hand!
        `;
    prompt.innerHTML += template;
}

function login() {
    const username = name.value;
    isLoggedIn = true;
    if (username) {
        document.querySelector('#game').classList.toggle('hidden');
        document.querySelector('#scoreboard').classList.toggle('hidden');
        document.querySelector('#login').classList.toggle('hidden');
    }
}

function logout() {
        isLoggedIn = false;
        document.querySelector('#game').classList.toggle('hidden');
        document.querySelector('#scoreboard').classList.toggle('hidden');
        document.querySelector('#login').classList.toggle('hidden');
}

function main() {
    loginButton.addEventListener('click', () => {
        generateDrawText();
        isLoggedIn = true;

        login();
    });

    logoutButton.addEventListener('click', () => {
        logout();
    });

    rock.addEventListener('click', () => {
        evaluateHand('placeholder', 'rock', (evaluation) => {
            let result = '';
            if (evaluation.gameEval === 1) {
                result = 'you won';
            } else if (evaluation.gameEval === -1) {
                result = 'you lost';
            } else {
                result = 'draw';
            }
        addToTable(result, evaluation.playerHand, evaluation.systemHand);
        });
    });

    paper.addEventListener('click', () => {
        evaluateHand('placeholder', 'paper', (evaluation) => {
            let result = '';
            if (evaluation.gameEval === 1) {
                result = 'you won';
            } else if (evaluation.gameEval === -1) {
                result = 'you lost';
            } else {
                result = 'draw';
            }
        addToTable(result, evaluation.playerHand, evaluation.systemHand);
        });
    });

    scissors.addEventListener('click', () => {
        evaluateHand('placeholder', 'scissors', (evaluation) => {
            let result = '';
            if (evaluation.gameEval === 1) {
                result = 'you won';
            } else if (evaluation.gameEval === -1) {
                result = 'you lost';
            } else {
                result = 'draw';
            }
        addToTable(result, evaluation.playerHand, evaluation.systemHand);
        });
    });

    fountain.addEventListener('click', () => {
        evaluateHand('placeholder', 'fountain', (evaluation) => {
            let result = '';
            if (evaluation.gameEval === 1) {
                result = 'you won';
            } else if (evaluation.gameEval === -1) {
                result = 'you lost';
            } else {
                result = 'draw';
            }
        addToTable(result, evaluation.playerHand, evaluation.systemHand);
        });
    });

    matchstick.addEventListener('click', () => {
        evaluateHand('placeholder', 'matchstick', (evaluation) => {
            let result = '';
            if (evaluation.gameEval === 1) {
                result = 'you won';
            } else if (evaluation.gameEval === -1) {
                result = 'you lost';
            } else {
                result = 'draw';
            }
        addToTable(result, evaluation.playerHand, evaluation.systemHand);
        });
    });
}
main();
