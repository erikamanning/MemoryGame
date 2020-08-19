/*///////////////////////////////////////////////////////////////////////

                    VARIABLES

///////////////////////////////////////////////////////////////////////*/

const gameContainer = document.getElementById("game");
const topRow = document.querySelector("#topRow");
const bottomRow = document.querySelector("#bottomRow");


let cardID = 0;
let flipCount = 0;
let loadCount = 0;


let cards = [];
let selectedCards = [];
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

/*///////////////////////////////////////////////////////////////////////

                    METHODS

///////////////////////////////////////////////////////////////////////*/

// shuffles array of cards and returns shuffled array
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// generates cards and attributes for each
function createDivsForColors(colorArray, id) {

  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // get unique card id
    id++;

    // add unique ID to card & add white backgroundcolor
    newDiv.setAttribute("data-ID", id);
    newDiv.style.backgroundColor = "white";

    // add card to card array
    cards.push({cardID: id, cardColor: color, cardFlipped: false, matched: false});

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the card to top row if in the first 5 cards, bottom row otherwise
    if(loadCount<5){

      topRow.append(newDiv);

    }
    else{

      bottomRow.append(newDiv);

    }
    loadCount++;
  }
  // set load count back to 0 once all cards loaded
    loadCount = 0;
}

// TODO: Implement this function!
function handleCardClick(event) {

  // you can use event.target to see which element was clicked
  let selectedCard = getCardByID(event.target.getAttribute("data-ID"));

  // checks if selected card is already flipped and if 2 cards are already selected
  if(!selectedCard.cardFlipped && selectedCards.length <2){

    flipCard(selectedCard.cardID);
    selectedCards.push(selectedCard);

    // check card flip ount
    if(selectedCards.length==2){

      // check if two cards match
        if(matchHandler()){

          winHandler();

        }
    }
  }
  // card is already flipped
}

function getCardByID(id){

  for( let card of cards){

    if(card.cardID == id){

      return card;

    }
  }
}

function flipCard(cardID){

  for(let card of allCards){

    if(card.getAttribute("data-ID") == cardID){

      // flip to white
      if(card.style.backgroundColor != "white"){

        card.style.backgroundColor = "white";
        getCardByID(cardID).cardFlipped = false;

      }
      //flip to color
      else{

        card.style.backgroundColor = card.className;
        getCardByID(cardID).cardFlipped = true;
        flipCount++;

      }
    }
  }
}

// checks if cards are a match, updates matches status if yes, flips back if no
// checks if final match
function matchHandler(){

  // match
  if(selectedCards[0].cardColor == selectedCards[1].cardColor){

    getCardByID(selectedCards[0].cardID).matched = true;
    getCardByID(selectedCards[1].cardID).matched = true;
    selectedCards = [];

  }
  // not a match
  else{

    setTimeout(function(){
      flipCard(selectedCards[0].cardID);
      flipCard(selectedCards[1].cardID);
      selectedCards = [];
    }, 1000);   

  }

  // check if user won
  return checkForWin();

}

function checkForWin(){

  for( let card of cards){

    if(!card.matched){

      return false;
    }
  }
  return true;
}

function winHandler(){

  restartButton.remove();

  setTimeout(function(){
    restartButton.innerText = "Play Again?";
    gameContainer.append(winSplash);
    buttonPanel.append(restartButton);

  }, 1000);
}

function clearGame(){

  for(let card of allCards){

    card.remove();
  }

  // set backend storing/tracking arrays back to empty
  cards=[];
  selectedCards = [];
}



/*////////////////////////////////////////////////////////////////////////////

                        DOM LOADS

*////////////////////////////////////////////////////////////////////////////

// create buttons and other variables for data movement
let allCards, shuffledColors;
const buttonPanel = document.querySelector("#buttonPanel");
const startButton = document.createElement("button");
const restartButton = document.createElement("button");
startButton.innerText = "Start!";
restartButton.innerText = "Restart";

// create win message
const winSplash = document.createElement("h1");
winSplash.id ="winsplash";
winSplash.innerText= "YOU WON!!!";


// game loads
buttonPanel.append(startButton);


/*////////////////////////////////////////////////////////////////////////////

                        LISTENERS

*////////////////////////////////////////////////////////////////////////////



// game starts
startButton.addEventListener("click", function(event){

  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors, cardID);
  allCards = document.querySelectorAll("div div div");

  startButton.remove();
  restartButton.innerText = "Restart";
  buttonPanel.append(restartButton);

});

// game restarts
restartButton.addEventListener("click", function(event){

  restartButton.remove();

  // clear game data
  clearGame();
  buttonPanel.append(startButton);
  winSplash.remove();

});


