var finalWord = ''
var partialWord = ''

var game = {
	wins: 0,
	guesses: [],
	guessesRemaining: 15,
	generateWord: function (){
		var options = ['usa', 'china', 'japan', 'england', 'france', 'brazil']
		var selection = options[Math.floor(Math.random() * options.length)]
		return selection
	},
	displayWord: function (x) {
		var str = ''
		var add = '_'
		var len = x.length
		for (i = 0; i < len; i++) {
			str = str.concat(add)
		}
		str = str.trim()
		return str
	},
	checkGuess: function (x) {
		return this.guesses.includes(' ' + x)
	},
	checkInWord: function (x, word) {
		return word.includes(x)
	},
	appendToGuesses: function (x, arr) {
		arr.push(' ' + x) //appends the character and a space to the arr, all checks need to include the space
	},
	appendToWord: function (char, word, completeWord) {
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
	},
	checkWin: function (given, final) {
		return given === final
	}

}

function reset () {
	game.guesses = []
	game.guessesRemaining = 15
	finalWord = game.generateWord()
	partialWord = game.displayWord(finalWord)
}


finalWord = game.generateWord()
partialWord = game.displayWord(finalWord)

document.onkeyup = function(event) {
	var userGuess = String.fromCharCode(event.keyCode).toLowerCase();

	if (!game.checkGuess(userGuess, guesses)) {
		
		game.guessesRemaining--
		if (game.checkInWord(userGuess, finalWord)) {
			partialWord = game.appendToWord(userGuess, partialWord, finalWord)
			game.appendToGuesses(userGuess, game.guesses)
		}else {
			game.appendToGuesses(userGuess, game.guesses)
		}
	}

	if (game.guessesRemaining == 0) {
		reset()
	}

	if (game.checkWin(partialWord, finalWord)) {
		game.wins++
		// Display image

		var flags = {
			'usa': 'us.png',
			'china': 'cn.png',
			'japan': 'jp.png',
			'england': 'gb.png',
			'france': 'fr.png',
			'brazil': 'br.png'
		}
		var url = flags[finalWord]

		var elem = document.getElementById('pic')
		//var elem = document.createElement('img');
		//elem.setAttribute('src', './assets/images/rio-olympic-logo.png');
		elem.setAttribute('src', './assets/images/' + url);
		elem.setAttribute('alt', 'Flag');
		//document.getElementById('picture').appendChild(elem);
		reset()
	}



	// Taking the variable data and displaying them in HTML
	var winsHtml = '<p>Wins = ' + game.wins + '</p>';
	var displayWordHtml = '<p>Current word = <span>' + partialWord + '</span></p>'
	var guessesRemainingHtml = '<p>Number of guesses remaining = ' + game.guessesRemaining + '</p>'
	var guessesHtml = '<p>Letters guessed already = ' + game.guesses + '</p>'


	// Placing the updated html
	document.querySelector('#wins').innerHTML = winsHtml;
	document.querySelector('#current-word').innerHTML = displayWordHtml;
	document.querySelector('#guesses-remaining').innerHTML = guessesRemainingHtml;
	document.querySelector('#guesses').innerHTML = guessesHtml;
}