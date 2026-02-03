// array of values
const values = ['🍎', '🍎', '🍇', '🍇', '🍋', '🍋', '🍒', '🍒', '🍍', '🍍', '🥝', '🥝', '🍓', '🍓', '🍑', '🍑'];

// shuffeld values
let shuffledValues = values.sort(() => (Math.random() > 0.5 ? 2 : -1));

let firstCard = null;
let secondCard = null;
let lockBoard = false;

const gameBoard = document.getElementById("game-board");            /* connecting to game-board container */


shuffledValues.forEach((value) => {
  const card = document.createElement("div");
  card.className = "card";                                          /* for all valus we craete div - and give him class card(css) */
  card.dataset.value = value;                                       /* save the value in a "secret pocket" for comparison */
  card.innerHTML = value;                                           /* put the value inside the card (hidden pocket) */
  
  card.addEventListener("click", flipCard);                         /* the event */
  
  gameBoard.appendChild(card);                                      /* inject the created card into the board */
});

function flipCard() {                                               
  if (lockBoard || this === firstCard) return;                      /* if board is locked or we click the same card - return */
  this.classList.add("flipped");                                    /* add the class that rotates the card in css */

  if (!firstCard) {
    firstCard = this;                                               /* saving the first card */
    return;
  }
  secondCard = this;                                                /* saving thesecond card */
  checkMatch();
}



function checkMatch() {
  let isMatch = firstCard.dataset.value === secondCard.dataset.value;

  if (isMatch) {
    disableCards();                                           
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard = null;
  secondCard = null;
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}