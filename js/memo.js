// array with card-front FA-icon classes
const cardsDeck = ["fa-at", "fa-at", "fa-beer", "fa-beer",
				"fa-bomb", "fa-bomb", "fa-cog", "fa-cog",
				"fa-gem", "fa-gem", "fa-moon", "fa-moon",
				"fa-paw", "fa-paw", "fa-skull", "fa-skull"];

// List od all cards 
let allCards = document.getElementsByClassName("entire-card");
// Flag to check card status
let clickFlag = true;

/**
* Function to handling card-rotate effect
*/
function rotateCard(e) {
	// to store id of clicked card
	let clickedCard = this.id;
	// conditions to rotate card
	if (clickFlag == true) {
		document.getElementById(clickedCard).classList.add("card-rotate");
		clickFlag = false;
	} else {
		document.getElementById(clickedCard).classList.remove("card-rotate");
		clickFlag = true;
	}
}

// to add event listener for all cards
for (i = 0; i < allCards.length; i++) {
	allCards.item(i).addEventListener("click", rotateCard);
}

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
	const cardsList = document.getElementsByClassName("fas");
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
	const cardsList = document.getElementsByClassName("fas");
	// remove icon-class for each i element
	for (i = 0; i < cardsList.length; i++) {
		cardsList[i].classList.remove(...cardsDeck);
	}
}
