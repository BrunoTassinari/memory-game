const FRONT = "card-front";
const BACK = "card-back";
const CARD = "card";
const divRestart = document.getElementById("game-finish");
const btnRestart = document.getElementById("restart");
const techs = [
  "bootstrap",
  "css",
  "electron",
  "firebase",
  "html",
  "javascript",
  "jquery",
  "mongo",
  "node",
  "react",
];

let cards = null;

startGame();

async function startGame() {
  let cards = createCardsFromTechs(techs);
  shuffle(cards);
  insertCardTable(cards);
  showCards(cards);
  verifyPlayTurn(cards);
}

function verifyPlayTurn(cards) {
  let playTurn = 2;
  let cardOne;
  let cardTwo;
  let countToWin = 0;

  cards.forEach((card) => {
    const cardItem = document.getElementById(card.id);
    cardItem.addEventListener("click", () => {
      if (playTurn != 0) {
        if (playTurn == 2 && cardTwo == null && !cardItem.classList.contains('click')) {
          cardTwo = cardItem;
          cardTwo.classList.add("flip");
          playTurn--;
        } else if (playTurn == 1 && cardOne == null && !cardItem.classList.contains('click')) {
          cardOne = cardItem;
          cardOne.classList.add("flip");
          playTurn = 2;
        }

        if (cardOne != null && cardTwo != null) {
          setTimeout(() => {
            const isPairs = verifyPairs({ cardTwo, cardOne });

            if (!isPairs) {
              cardOne.classList.remove("flip");
              cardTwo.classList.remove("flip");
            }

            if (isPairs) {
              disableCards({ cardOne, cardTwo });
              countToWin++;

              if(countToWin == 10){
                  isGameFinish();
              }
            }

            cardOne = null;
            cardTwo = null;
          }, 500);
        }
      }

      if (playTurn == 0 && cardOne == null && cardTwo == null) {
        playTurn = 2;
      }
    });
  });
}

function showCards(cards) {
  cards.forEach((card) => {
    const cardItem = document.getElementById(card.id);

    setTimeout(() => {
        cardItem.classList.add('flip')
    },400)

    setTimeout(() => {
        cardItem.classList.remove('flip');
    },1500);

  });
}

function verifyPairs({ cardOne, cardTwo }) {
  if (cardOne.dataset.icon == cardTwo.dataset.icon) {
    return true;
  }

  return false;
}

function disableCards({ cardOne, cardTwo }) {
  let cardOnePair = document.getElementById(cardOne.id);
  let cardTwoPair = document.getElementById(cardTwo.id);

  cardOnePair.classList.add('click');
  cardTwoPair.classList.add('click');

  cardOnePair.setAttribute("disabled", true);
  cardTwoPair.setAttribute("disabled", true);
}

function isGameFinish() {
  divRestart.style = "display:flex";

  btnRestart.addEventListener("click", () => {
    location.reload();
  });
}

function createCardsFromTechs(techs) {
  let cards = [];

  techs.forEach((tech) => {
    cards.push(createPairFromTech(tech));
  });

  return cards.flatMap((pair) => pair);
}

async function insertCardTable(cards) {
  const tableCard = document.getElementById("game-board");

  cards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.id = card.id;
    cardElement.classList.add(CARD);
    cardElement.dataset.icon = card.icon;

    cardElement.appendChild(createElementFront(card));
    cardElement.appendChild(creteElementeBack(card));

    tableCard.appendChild(cardElement);
  });
}

function createElementFront(card) {
  const frontCardElement = document.createElement("div");

  frontCardElement.classList.add(FRONT);
  frontCardElement.classList.add("flex");

  const imgFrontCard = document.createElement("img");
  imgFrontCard.src = "./assets/" + card.icon + ".png";

  frontCardElement.appendChild(imgFrontCard);

  return frontCardElement;
}

function creteElementeBack() {
  const backCardElement = document.createElement("div");

  backCardElement.classList.add(BACK);
  backCardElement.classList.add("flex");

  const contentOfBack = document.createElement("img");
  contentOfBack.src = "./assets/icon.png";

  backCardElement.appendChild(contentOfBack);

  return backCardElement;
}

function createPairFromTech(tech) {
  return [
    {
      id: createIdWithTech(tech),
      icon: tech,
      flipeed: false,
    },
    {
      id: createIdWithTech(tech),
      icon: tech,
      flipeed: false,
    },
  ];
}

function createIdWithTech(tech) {
  return tech + parseInt(Math.random() * 1000);
}

function shuffle(cards) {
  let maxIndex = cards.length;
  let currentIndex = maxIndex;
  let randomIndex = 0;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [cards[randomIndex], cards[currentIndex]] = [
      cards[currentIndex],
      cards[randomIndex],
    ];
  }
}
