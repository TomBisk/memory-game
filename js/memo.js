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
	for (let i = 0; i < cardsList.length; i++) {
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
	for (let i = 0; i < cardsList.length; i++) {
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
* Function to flash effect when cards matched
*@param {string} c1 - id of first matched card
*@param {string} c2 - id of second matched card
*/
function flash(c1, c2) {
	setTimeout(function() {
		document.getElementById(c1).classList.add("flash");
		document.getElementById(c2).classList.add("flash");
	}, 450);

		setTimeout(function() {
		document.getElementById(c1).classList.remove("flash");
		document.getElementById(c2).classList.remove("flash");
	}, 160);
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
		toCountMoves(); // to add move to counter
		rating(); // to set 'star rating'
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
		flash(c1, c2); // to flash matched cards
		gameStatus(); // to check status of the game
		eventRemove(c1, c2); //to remove event listeners form matched cards
	} else {
		coverCard(c1, c2); //to cover unmatched cards
	}
}

/**
* Function to check if the game is finished
*/
let pairsToGuess; // to set how many pairs of cards left to guess

function gameStatus() {
	pairsToGuess--;
	if (pairsToGuess == 0) {
		toStopWatch(); //stop the stopwatch
		setTimeout(function() { //display result popup
			displayResult(); //to put results to the modal
    		modalResult();  // to show modal with results
  		}, 500); 
	} else {
		
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
* Function to count player's moves 
*/
let moveCounter; // To store number of moves

function toCountMoves() {
	moveCounter++;
	document.getElementById("item-moves").innerHTML = moveCounter;
}

/**
* Function to reser counter of moves
*/
function resetCounter() {
	moveCounter = 0;
	document.getElementById("item-moves").innerHTML = moveCounter;
}

/**
* Function to reflects the player's performance ("star rating")
*/
function rating() {
	const star1 = document.getElementById("one-star");
	const star2 = document.getElementById("two-star");
	const star3 = document.getElementById("three-star");
	// change stars style depending on number of moves
	if (moveCounter == 18) {
		star1.classList.remove("fas");
		star1.classList.add("far");
	} else if (moveCounter == 16){
		star2.classList.remove("fas");
		star2.classList.add("far");
	} else if (moveCounter == 14) {
		star3.classList.remove("fas");
		star3.classList.add("far");
	} else {
		
	}
}

/**
* Function to reset "star rating" when game is restarted
*/ 
function resetRating() {
	const rateItem = document.querySelectorAll("#item-rating i");
	for (let i =0; i < rateItem.length; i++) {
		rateItem[i].classList.remove("far");
		rateItem[i].classList.add("fas");
	}
}

/**
* Function of stopwatch
*/
const itemTimer = document.getElementById("item-timer"); // to get 'timer' html element
let gameTime; //time of the game

function stopwatch() {
	gameTime++;
	itemTimer.innerText = gameTime /100;
	//statement to stop the game when time is too long
	if (gameTime == 9999) { // set max. time value (100 = 1 [s])
		toStopWatch();
		modalToLong();
	} else {
		
	}
}

/**
* Function to start the stopwatch
*/ 
let interval;

function toStartWatch() {
	gameTime = 0; // to reset time of previous game 
	interval = setInterval(stopwatch, 10); //call stopwatch() every 10 ms
}


/**
* Function to stop the stopwatch
*/ 
function toStopWatch() {
	clearInterval(interval);
}

/**
* Function to display result in popup
*/ 
function displayResult() {
	const resultMoves = document.getElementById("result-moves");
	resultMoves.innerText = moveCounter + " moves";
	const resultTime = document.getElementById("result-time");
	resultTime.innerText = gameTime / 100 + " seconds";
	const resultRating = document.getElementById("item-rating").innerHTML;
	console.log(resultRating);
	const ratingCln = resultRating;
	console.log(ratingCln);
	const resultStars = document.getElementById("result-stars");
	resultStars.innerHTML = ratingCln;
}

/**
* Function to display start popup
*/ 
function modalStart() {
  	let href = "#modal-start";
  	window.open(href, "_self");
}

/**
* Function to display result popup when the game is finished
*/ 
function modalResult() {
	let href = "#modal-result";
	window.open(href, "_self");
}

/**
* Function to  display popup when the game is restarted
*/ 
function modalRestart() {
	toStopWatch(); // to stop stopwatch
	let href = "#modal-restart";
  	window.open(href, "_self");
}

/**
* Function to stop the game when time reaches the max. setted value
* Max. time to set: in stopwatch() function
*/
function modalToLong() {
  	let href = "#modal-to-long";
  	window.open(href, "_self");
}

/**
* Function to restart game. Function to cover all cards, 
* reset all score-tools and initialize the new game.
* Function is called by 'restart' button
*/
function restart() {
	const toRestart = document.getElementsByClassName("entire-card");
	for (let i = 0; i < toRestart.length; i++) {
		toRestart.item(i).classList.remove("card-rotate");
	}
	resetRating(); // to reset 'star rating'
	initGame(); // to initialize a new game		   
}

/**
* Function to initialize game during first run and after reset
*/
function initGame() {
	window.open("#close", "_self"); // to close popup
	let allCards = document.getElementsByClassName("entire-card"); // List of all cards
	// to add event listener for all cards
	for (let i = 0; i < allCards.length; i++) {
		allCards.item(i).addEventListener("click", uncoverCard);
		allCards.item(i).addEventListener("click", storeCard);
	} 
	resetCounter(); // to reset counter of moves
	pairsToGuess = 8; //set initial number of pairs of cards to guess
	setTimeout(function() {
		eraseCards(); //to erase icon classes from cards after restart
		shuffle(cardsDeck); // to shuffle card-icons
		dealCards(); // to assign icons to cards
		toStartWatch(); // to start stopwatch		
	}, 500);
}

// Set event listener to 'restart' button
document.getElementById("restart").addEventListener("click", modalRestart);

// Event listener for start button, to call initGame()
const startButton = document.getElementById("start-game");
startButton.addEventListener("click", initGame);

// Event listeners for each restart button, to call restart()
const againButton = document.getElementsByClassName("play-again");
for (let i = 0; i < againButton.length; i++) {
	againButton.item(i).addEventListener("click", restart);
}

modalStart(); //Display 'start popup'