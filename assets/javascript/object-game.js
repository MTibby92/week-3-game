var finalWord = ''
var partialWord = ''

var game {
	wins: 0,
	guesses: [],
	guessesRemaining: 15,
	generateWord: function (){
		var options = ['abraham', 'isaac', 'jacob', 'judah']
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
	partialWord = displayWord(finalWord)
}



document.onkeyup = function(event) {
	var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
}