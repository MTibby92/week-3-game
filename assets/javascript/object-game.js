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

}

function reset () {

}