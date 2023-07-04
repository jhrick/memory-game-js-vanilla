//assign elements of HTML
const cardsBox = document.querySelector(".cards-container");
const gameOverMessage = document.querySelector(".cover");
const restartGameBtn = gameOverMessage.querySelector(
  ".game-over-message__container #btn-restart-game"
);

let cards = [
  "🚀",
  "😎",
  "💻",
  "🔥",
  "💀",
  "🐻",
  "⚽",
  "🎸",
  "💡",
  "⏰",
  "🇧🇷",
  "🍔",
  "🍕",
  "🍅",
  "👍",
  "🏛️",
  "💟",
  "🎬",
];
cards = cards.concat(cards);

function mixCard(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

mixCard(cards);

let allCardsUntapped = false;
let clickBlocked = false;
let firstCard;
let score = 0;
const allCards = cardsBox.children;

function viewTheCards(card) {
  card.classList.add("untapped");
  setTimeout(() => {
    card.classList.remove("untapped");
  }, 1500);
}

function checkEndGame() {
  for (let i = allCards.length - 1; i > 0; i--) {
    const element = allCards[i];

    if (!element.classList.contains("untapped")) {
      allCardsUntapped = false;
      break;
    } else {
      allCardsUntapped = true;
    }
  }
}

function createBoxCard(cardIcon) {
  const boxCard = document.createElement("div");

  boxCard.classList.add("card__item");

  boxCard.innerHTML = `<div class="card-items-container">
  <span class="card-item__icon">${cardIcon}</span>
  <span class="card-item__cover"></span>
  </div>`;

  return boxCard;
}

setTimeout(() => {
  clickBlocked = false;
}, 1600);

cards.forEach((card) => {
  const boxCard = createBoxCard(card);

  cardsBox.appendChild(boxCard);

  document.addEventListener("DOMContentLoaded", () => {
    viewTheCards(boxCard);
  });

  boxCard.addEventListener("click", (e) => {
    if (clickBlocked) {
      return;
    }

    clickBlocked = true;

    if (!boxCard.classList.contains("untapped")) {
      boxCard.classList.add("untapped");

      if (firstCard) {
        let currentCard = boxCard.querySelector(
          ".card-items-container .card-item__icon"
        );
        if (currentCard.textContent === firstCard.textContent) {
          checkEndGame();
          firstCard = null;
          currentCard = null;
        } else {
          setTimeout(() => {
            firstCard.parentNode.parentNode.classList.remove("untapped");
            firstCard = null;
            currentCard.parentNode.parentNode.classList.remove("untapped");
            currentCard = null;
          }, 1300);
        }
      } else {
        firstCard = boxCard.querySelector(
          ".card-items-container .card-item__icon"
        );
      }
    }

    if (allCardsUntapped) {
      gameOverMessage.classList.add("game-over");
    }

    setTimeout(() => {
      clickBlocked = false;
    }, 1600);
  });
});

restartGameBtn.addEventListener("click", () => {
  location.reload();
});
