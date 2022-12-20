import {HANDS, isConnected, getRankings, evaluateHand} from './game-service.js';
// TODO: Create DOM references
const logoutButton = document.getElementById('back');
const loginButton = document.getElementById('enter-button');
const name = document.getElementById('user-input');
const results = document.getElementById('current-game-body');
const prompt = document.getElementById('pick-your-hand');
const ranklist = document.getElementById('scoreboard-body');
const handButtons = document.getElementById('hand-buttons');
const startPage = document.getElementById('start-page');
const gamePage = document.getElementById('game');
const countdownParagraph = document.getElementById('countdown');

// TODO: How to keep track of App state?
let isLoggedIn = false;
const hands = null;
let disableHands = false;
let onStartPage = false;
let onGamePage = false;
let disableLogoutButton = false;
let countdown = '';

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

function disableButtons() {
    const hands = document.getElementsByClassName('hand');
    for (let i = 0; i < hands.length; i++) {
        hands[i].disabled= true;
    }
    logoutButton.disabled = true;
}

function enableButtons() {
    const hands = document.getElementsByClassName('hand');
    for (let i = 0; i < hands.length; i++) {
        hands[i].disabled= false;
    }
    logoutButton.disabled = false;
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
    gameCountdown(3);
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

function gameCountdown(seconds) {
    let waiting = true;
    disableButtons();
    countdown = `Next game in ${seconds}`;
    countdownParagraph.innerHTML = countdown;
    setTimeout(() => {
        if (seconds === 1) {
            countdown = '';
            countdownParagraph.innerHTML = '';
            enableButtons();
        } else {
            gameCountdown(seconds - 1);
        }
    }, 1000);
}

function getUserHand(handName) {
    return HANDS.find((hand) => hand === handName);
}

function login() {
    const username = name.value;
    isLoggedIn = true;
    if (username) {
        document.querySelector('#game').classList.toggle('hidden');
        document.querySelector('#start-page').classList.toggle('hidden');
    }
}

function logout() {
        isLoggedIn = false;
        document.querySelector('#game').classList.toggle('hidden');
        document.querySelector('#start-page').classList.toggle('hidden');
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
