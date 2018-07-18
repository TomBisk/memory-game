// array with card-front FA-icon classes
const cardsDeck = ["fa-at", "fa-at", "fa-beer", "fa-beer",
				"fa-bomb", "fa-bomb", "fa-cog", "fa-cog",
				"fa-gem", "fa-gem", "fa-moon", "fa-moon",
				"fa-paw", "fa-paw", "fa-skull", "fa-skull"];

/**
* Function to random shuffle card-front icon's classes
* (based on function in starter code)
* @param {array} cardsDeck - cards icon's classes
* @return {array} cardsDeck - shuffled array
*/
function shuffle(cardsDeck) {
	let currentIndex = cardsDeck.length, temporaryValue, randomIndex;
	
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = cardsDeck[currentIndex];
		cardsDeck[currentIndex] = cardsDeck[randomIndex];
		cardsDeck[randomIndex] = temporaryValue;
	} 
	return cardsDeck;
}

/**
* Function to add shuffled classes to cards
*/
function dealCards() {
	// create array of i elements which represents cards
	const cardsList = document.querySelectorAll(".entire-card .fas");
	// add icon-class for each i element
	for (i = 0; i < cardsList.length; i++) {
		let addIcon = cardsList[i];
		addIcon.classList.add(cardsDeck[i]);
	} 
}

/**
* Function to remove icons(classes) from cards
*/
function eraseCards() {
	// create array of i elements which represents cards
	const cardsList = document.querySelectorAll(".entire-card .fas");
	// remove icon-class for each i element
	for (i = 0; i < cardsList.length; i++) {
		cardsList[i].classList.remove(...cardsDeck);
	}
}

/**
* Function to uncover clicked card effect
*/
function uncoverCard() {
	// to store id of clicked card
	let clickedCard = this.id;
	document.getElementById(clickedCard).classList.add("card-rotate");
}

/** Function to cover uncovered cards when cards differ
* @param {string} c1 - id of first uncovered card
* @param {string} c2 - id of second uncovered card
*/
function coverCard(c1, c2) {
	setTimeout(function(){
    document.getElementById(c1).classList.remove("card-rotate");
    document.getElementById(c2).classList.remove("card-rotate");
  }, 500); //delay time depending of transition time of .entire-card
}

/**
* Function to store uncovered cards
*/
storeArray = new Array(2); // array to store uncovered cards

function storeCard(e) {
	let clickedCard = this.id;
	storeArray.unshift(clickedCard);
	storeArray.pop();
	//check condition if two diffrent card are uncovered
	if (storeArray[0] !== storeArray[1] & storeArray[1] !== undefined) {
		compareCards(storeArray[0], storeArray[1]); // call to function to compare
		storeArray = new Array(2); // to erase array
	} else {
		
	}
}

/**
* Function to compare two uncovered cards
* @param {string} c1 - Id of first uncovered card
* @param {string} c2 - Id of second uncovered card
*/
function compareCards(c1, c2) {
	if (document.querySelector("#" + c1 + " i").className === document.querySelector("#" + c2 + " i").className) {
		eventRemove(c1, c2); //to remove event listeners form matched cards
	} else {
		coverCard(c1, c2); //to cover unmatched cards
	}
}

/**
* Function to block uncovered and matched cards. 
* Function removes event listeners from matched cards.
* @param {string} c1 - Id of first matched card 
* @param {string} c2 - Id of second matched card
*/
function eventRemove(c1, c2) {
  document.getElementById(c1).removeEventListener("click", uncoverCard);
  document.getElementById(c1).removeEventListener("click", storeCard);
  document.getElementById(c2).removeEventListener("click", uncoverCard);
  document.getElementById(c2).removeEventListener("click", storeCard);
}


/**
* Function to restart game. Function to cover all cards, 
* reset all score-tools and initialize the new game.
* Function is called by 'restart' button
*/
function restart() {
	const toRestart = document.getElementsByClassName("entire-card");
	for (i = 0; i < toRestart.length; i++) {
		toRestart.item(i).classList.remove("card-rotate");
	}
	initGame();
}

/**
* Function to initialize game during first run and after reset
*/
function initGame() {
// List of all cards 
	let allCards = document.getElementsByClassName("entire-card");
// to add event listener for all cards
	for (i = 0; i < allCards.length; i++) {
		allCards.item(i).addEventListener("click", uncoverCard);
		allCards.item(i).addEventListener("click", storeCard);
	}
	eraseCards(); //to erase icon classes from cards after restart
	shuffle(cardsDeck); // to shuffle card-icons
	dealCards(); // to assign icons to cards
}

// Set event listener to 'restart' button
document.getElementById("restart").addEventListener("click", restart);

initGame(); // Call to initialize the game