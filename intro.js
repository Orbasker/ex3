// let cards = document.querySelectorAll('.card');

// let flippedCards = [];

// let matchedCards = [];

// cards.forEach(card => {
//     card.addEventListener('click', () => {
//         if (!card.classList.contains('clicked') && flippedCards.length < 2) {
//             card.classList.add('clicked');
//             flippedCards.push(card);
//             if (flippedCards.length === 2) {
//                 let card1 = flippedCards[0];
//                 let card2 = flippedCards[1];
//                 if (card1.dataset.card === card2.dataset.card) {
//                     card1.classList.add('matched');
//                     card2.classList.add('matched');
//                     matchedCards.push(card1, card2);
//                     flippedCards = [];
//                 } else {
//                     setTimeout(() => {
//                         card1.classList.remove('clicked');
//                         card2.classList.remove('clicked');
//                         flippedCards = [];
//                     }, 1000);
//                 }
//             }
//             if (matchedCards.length === cards.length) {
//                 alert('You won!');
//             }
//         }
//     });
// });

// var cardArray = [
//     {
//         name: "fries",
//         img: "images/fries.png"
//     },
//     {
//         name: "cheeseburger",
//         img: "images/cheeseburger.png"
//     },
//     {
//         name: "ice-cream",
//         img: "images/ice-cream.png"
//     },
//     {
//         name: "pizza",
//         img: "images/pizza.png"
//     },
// ];
// function flipCard() {
//     var cardId = this.getAttribute("data-id");
//     this.classList.add("flip");
//     this.innerHTML = cardArray[cardId].name;
//     cardsChosen.push(cardArray[cardId]);
//     cardsChosenIds.push(cardId);
//     if (cardsChosen.length === 2) {
//       setTimeout(checkForMatch, 500);
//     }
//   }
  



let cards = document.querySelectorAll('.card');
let flippedCards = [];
let matchedCards = [];
let cardsChosen = [];
let cardsChosenIds = [];
let cardArray = [    {        name: "fries",        img: "images/fries.png"    },    {        name: "cheeseburger",        img: "images/cheeseburger.png"    },    {        name: "ice-cream",        img: "images/ice-cream.png"    },    {        name: "pizza",        img: "images/pizza.png"    },];

function flipCard() {
    var cardId = this.getAttribute("data-card");
    this.classList.add("clicked");
    this.innerHTML = cardArray[cardId].name;
    cardsChosen.push(cardArray[cardId]);
    cardsChosenIds.push(cardId);
    if (cardsChosen.length === 2) {
        cards.forEach(card => {
            card.removeEventListener('click', flipCard);
        });
        setTimeout(checkForMatch, 1000);
    }
}

function checkForMatch() {
    let card1 = cardsChosenIds[0];
    let card2 = cardsChosenIds[1];
    if (cardArray[card1].name === cardArray[card2].name) {
        cards[card1].classList.add("matched");
        cards[card2].classList.add("matched");
        matchedCards.push(cardsChosen[0], cardsChosen[1]);
    } else {
        cards[card1].classList.remove("clicked");
        cards[card1].innerHTML = "";
        cards[card2].classList.remove("clicked");
        cards[card2].innerHTML = "";
    }
    cardsChosen = [];
    cardsChosenIds = [];
    cards.forEach(card => {
        card.addEventListener('click', flipCard);
    });
    if (matchedCards.length === cardArray.length) {
        alert("Congratulations! You won the game!");
    }
}

cards.forEach(card => {
    card.addEventListener('click', flipCard);
});




