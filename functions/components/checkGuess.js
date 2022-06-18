const ColorCode = {
	GREY: "grey",
	GREEN: "green",
	YELLOW: "yellow",
}

function checkGuess (guessString, guessesRemaining, answer) {
    let currentGuess = Array.from(guessString)
    let rightGuess = Array.from(answer)
    let WORDS = [] //this is the list of whitelisted words
    let resultColorArray = []
    let correct = false

    if (guessString.length != 5) {
        alert("Not enough letters!")
        return
    }

    if (!WORDS.includes(guessString)) {
        alert("Word not in list!")
        return
    }

    for (let i = 0; i < 5; i++) {
        let letterColor = ColorCode.GREY
        
        let letterPosition = rightGuess.indexOf(currentGuess[i])

        if (letterPosition === -1) {
            letterColor = ColorCode.GREY
        } else {
            if (currentGuess[i] === rightGuess[i]) {
                letterColor = ColorCode.GREEN
            } else {
                letterColor = ColorCode.YELLOW
            }
        }
        resultColorArray.push(letterColor)
    }

    if (guessString === rightGuessString) {
        alert("You guessed right! Game over!")
        correct = true
    } else {
        guessesRemaining -= 1;
    }

    return {
        resultColorArray, 
        guessesRemaining: guessesRemaining - 1, 
        correct: correct
    }
}