const FRONT = "card-front";
const BACK = "card-back";
const CARD = "card";
const divRestart = document.getElementById('game-finish');
const btnRestart = document.getElementById('restart')
const techs = [
 'bootstrap',
 'css',
 'electron',
 'firebase',
 'html',
 'javascript',
 'jquery',
 'mongo',
 'node',
 'react',
];

let cards = null;

startGame();

function startGame() {
    let cards = createCardsFromTechs(techs);
    shuffle(cards);
    insertCardTable(cards); 
    verifyPlayTurn(cards); 

}

function verifyPlayTurn(cards) {

    let playTime = 2;
    let cardOne;
    let cardTwo;
    let countToWin = 0;
   
    cards.forEach((card) => {
        const cardItem = document.getElementById(card.id);
        cardItem.addEventListener("click", () => {

        if(playTime != 0){
            if(playTime == 2 && cardTwo == null){
                
                cardTwo = cardItem;
                cardTwo.classList.add("flip");
                playTime--;

            } else if(playTime == 1){

                cardOne = cardItem;
                cardOne.classList.add("flip");
                playTime=2;
            }

            if(cardOne != null && cardTwo != null) {
                setTimeout(()=> {
                    if(cardOne.dataset.icon != cardTwo.dataset.icon){
                        cardOne.classList.remove('flip');
                        cardTwo.classList.remove('flip');
                    } 

                    if(cardOne.dataset.icon == cardTwo.dataset.icon){
                        countToWin++;
                        
                        if(countToWin == 10){
                            isGameFinish()
                        }
                    }

                    cardOne = null;
                    cardTwo = null;
                    
                },300)
            }
        }

        if(playTime == 0 && cardOne == null && cardTwo == null) {
            playTime = 2;
        
        }

    })

    })
}

function isGameFinish() {
    divRestart.style = 'display:flex';

    btnRestart.addEventListener('click', () => {
        location.reload();
    })
}

function createCardsFromTechs(techs){
    let cards =[];

    techs.forEach(tech => {
        cards.push(createPairFromTech(tech))
    });

    return cards.flatMap(pair => pair);

}

function insertCardTable(cards){
    const tableCard = document.getElementById('game-board');

    cards.forEach((card) => {        
        const cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon

        cardElement.appendChild(createElementFront(card));
        cardElement.appendChild(creteElementeBack(card));

        tableCard.appendChild(cardElement);
        
    })

}

function createElementFront(card){
    const frontCardElement = document.createElement('div');

    frontCardElement.classList.add(FRONT);
    frontCardElement.classList.add('flex')
     
    const imgFrontCard  = document.createElement('img');
    imgFrontCard.src = '../images/' + card.icon + '.png';

    frontCardElement.appendChild(imgFrontCard);

    return frontCardElement
}

function creteElementeBack(card){
    const backCardElement = document.createElement('div');

    backCardElement.classList.add(BACK);
    backCardElement.classList.add('flex');

    const contentOfBack =  document.createTextNode('</>');

    backCardElement.appendChild(contentOfBack);

    return backCardElement;

}

function createPairFromTech(tech){
    return [{
        id: createIdWithTech(tech),
        icon: tech,
        flipeed: false,
    }, 
    {
        id: createIdWithTech(tech),
        icon: tech,
        flipeed: false,
    }]
}

function createIdWithTech(tech){
    return tech + parseInt(Math.random() * 1000);
}


function shuffle(cards){
    let maxIndex = cards.length;
    let currentIndex = maxIndex;
    let randomIndex = 0;

    while(currentIndex != 0){
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--;

        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]]
    }

}