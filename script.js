// const board = document.getElementById("game-board");

// const elements = ['😈', '😈', '🧤', '🧤', '👑', '👑', '🎯', '🎯'];

// elements.forEach(element => {
//     const card = document.createElement('div');
//     card.classList.add('card');

//     card.textContent = element;

//     card.addEventListener('click', () => {
//         card.classList.add('flipped');
//     });

//     board.appendChild(card)
// });

const board = document.getElementById('game-board');
const emojis = ['😈', '😈', '🧤', '🧤', '👑', '👑', '🎯', '🎯'];

let firstCard = null;
let secondCard = null;
let lockBoard = false;



emojis.forEach(emoji => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = emoji;

    card.addEventListener('click', () => {
        if (lockBoard) return;
        if (card === firstCard) return;
        if (card.classList.contains('flipped')) return;

        card.classList.add('flipped');

        if (!firstCard) {
            firstCard = card;
            return;
        }

        secondCard = card;
        checkMatch();
    });

    board.appendChild(card);
});

function checkMatch() {
    const isMatch = firstCard.textContent === secondCard.textContent;

    if (isMatch) {
        resetBoard();
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}