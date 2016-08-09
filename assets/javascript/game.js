// =================== Global Variables ==================================
var guesses = []
var guessesRemaining = 15
var wins = 0
var currentWord = generateWord() 	//word the user is guessing
var displayedWord = displayWord(currentWord)	//fragment displayed to user






//======================= Function Library =============================

// Randomly chooses a word to use from the array of options
function generateWord () {
	var options = ['abraham', 'isaac', 'jacob', 'judah']
	var selection = options[Math.floor(Math.random() * options.length)]
	return selection
}

// Looks at the selected word and generates the string for the blanks
function displayWord (x) {
	var str = ''
	var add = '_'
	var len = x.length
	for (i = 0; i < len; i++) {
		str = str.concat(add)
	}
	str = str.trim()
	return str
}

// Checks if the character input has been chosen before, returns true or false
function checkGuess (x, arr) {
	return arr.includes(' ' + x) //the added space in the check is necessary, since i'm pushing a space to the arr later
}

// checks if the character is in the final word
function checkInWord (x, word) {
	return word.includes(x)
}

// Add character to array of guesses
function appendToGuesses (x, arr) {
	arr.push(' ' + x) //appends the character and a space to the arr, all checks need to include the space
}

// Replaces the displayed blank string with the correctly guessed character
function appendToWord (char, word, completeWord) {
	var indices = [];
	//finds all indices of char in the original word
	for(var i=0; i<completeWord.length;i++) {
	    if (completeWord[i] === char) {
	    	indices.push(i);
	    }
	}
	//replaces all indices in incomplete word with char and returns the word
	for (ind in indices) {
		word = word.substr(0, indices[ind]) + char + word.substr(indices[ind] + 1)
	}
	return word
}

// returns true if the current word matches the final version of the word
function checkWin (given, final) {
	return given === final
}

// resets stats and page after a win is confirmed or guesses remaining reaches 0
function reset () {
	guesses = []
	guessesRemaining = 15
	currentWord = generateWord()
	displayedWord = displayWord(currentWord)
}

// ========================= End Function Library =============================








// core function that listens for keystroke
document.onkeyup = function(event) {
	var userGuess = String.fromCharCode(event.keyCode).toLowerCase();

	// console.log('The selected word is ' + currentWord)
	// console.log('The users guess is ' + userGuess)
	// console.log('The arr guesses contains ' + guesses)

	if (!checkGuess(userGuess, guesses)) {
		
		guessesRemaining--
		if (checkInWord(userGuess, currentWord)) {
			displayedWord = appendToWord(userGuess, displayedWord, currentWord)
			appendToGuesses(userGuess, guesses)
		}else {
			appendToGuesses(userGuess, guesses)
		}
	}

	if (guessesRemaining == 0) {
		reset()
	}

	if (checkWin(displayedWord, currentWord)) {
		wins++
		reset()
	}



	// Taking the variable data and displaying them in HTML
	var winsHtml = '<p>Wins = ' + wins + '</p>';
	var displayWordHtml = '<p>Current word = <span>' + displayedWord + '</span></p>'
	var guessesRemainingHtml = '<p>Number of guesses remaining = ' + guessesRemaining + '</p>'
	var guessesHtml = '<p>Letters guessed already = ' + guesses + '</p>'


	// Placing the updated html
	document.querySelector('#wins').innerHTML = winsHtml;
	document.querySelector('#current-word').innerHTML = displayWordHtml;
	document.querySelector('#guesses-remaining').innerHTML = guessesRemainingHtml;
	document.querySelector('#guesses').innerHTML = guessesHtml;

}