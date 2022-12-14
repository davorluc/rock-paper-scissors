import {HANDS, isConnected, getRankings, evaluateHand} from './game-service.js';
// TODO: Create DOM references
const logoutButton = document.getElementById('back');
const loginButton = document.getElementById('enter-button');
const name = document.getElementById('user-input');
const results = document.getElementById('current-game-body');
const prompt = document.getElementById('pick-your-hand');
const ranklist = document.getElementById('scoreboard-body');
const handButtons = document.getElementById('hand-buttons');

// TODO: How to keep track of App state?
let isLoggedIn = false;
const hands = null;
let disableHands = false;
let disableLogoutButton = false;

// TODO: Create View functions

function addButtons() {
    return HANDS.map((hand) => (`<button id="${hand}" class="hand" type="button">${hand}</button>`))
        .join('');
}

function generateDrawText() {
    const inputName = name.value;
    const template = `
       ${inputName}, pick your hand!
        `;
    prompt.innerHTML += template;
}

function changeHandsAvailability() {
    hands.forEach((button) => {
        button.disabled = disableHands;
    });
    logoutButton.disabled = disableLogoutButton;
}

function addToTable(result, userInput, computerInput) {
    const template = `
                <tr>
                    <td>${result}</td>
                    <td>${userInput}</td>
                    <td>${computerInput}</td>
                </tr>
    `;
    results.innerHTML += template;
}

function createRanking(rankingEntries) {
    ranklist.innerHTML = rankingEntries.map((x) => (`<tr>
            <td>${x.rank}</td>
            <td>${x[0]}</td>
            <td>${x[1].win}</td>
        </tr>`))
        .join('');
}

function updateRanking() {
    ranklist.innerHTML = '';
    getRankings(createRanking);
}

function getUserHand(handName) {
    return HANDS.find((hand) => hand === handName);
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

// TODO: Register Event Handlers

loginButton.addEventListener('click', () => {
    generateDrawText();
    isLoggedIn = true;

    login();
});

name.addEventListener('keydown', (x) => {
    if (x.key === 'Enter') {
        loginButton.click();
    }
});

logoutButton.addEventListener('click', () => {
    logout();
    prompt.innerHTML = '';
    results.innerHTML = '';
    handButtons.innerHTML = '';
    updateRanking();
});

const resultText = {
    [-1]: 'you lost',
    0: 'draw',
    1: 'you won',
};

function main() {
    updateRanking();
    handButtons.innerHTML += addButtons();
    handButtons.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.matches('.hand')) {
            const userHand = getUserHand(e.target.innerText);
            evaluateHand(name.value, userHand, (evaluation) => {
                addToTable(resultText[evaluation.gameEval], userHand, evaluation.systemHand);
            });
        }
    });
}
main();
