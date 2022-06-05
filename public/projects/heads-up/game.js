class Deck {
    constructor() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
        this.size = Math.floor(Math.random() * 20 + 6)
        this.charSet = chars.slice(0, this.size)
    }

    sample() {
        const cards = []
        const chars = this.charSet.slice()
        for (let i = 0; i < 5; ++i) {
            const index = Math.floor(Math.random() * chars.length)
            cards.push(chars[index])
            chars.splice(index, 1)
        }
        return cards
    }
}

function getCardDiv(cardName) {
    const cardDiv = document.createElement("div")
    cardDiv.classList.add("drop-shadow", "rounded-lg", "w-16", "h-24", "bg-white")
    cardDiv.classList.add("flex", "justify-center", "items-center", "shrink-0", "my-1")
    const cardNameDiv = document.createElement("div")
    cardNameDiv.classList.add("text-center")
    const cardNameP = document.createElement("p")
    cardNameP.classList.add("text-xl", "font-semibold")
    cardNameP.innerHTML = cardName
    cardNameDiv.appendChild(cardNameP)
    cardDiv.appendChild(cardNameDiv)
    return cardDiv
}

function getCardRowDiv(cardNames) {
    const cardRow = document.createElement("div")
    cardRow.classList.add("flex", "flex-row", "space-x-4", "overflow-x-auto")
    cardNames.map(getCardDiv).forEach(cardDiv => {
        cardRow.appendChild(cardDiv)
    })
    return cardRow
}

const gameContent = document.getElementById("game_content")
const gameButton = document.getElementById("game_button")

function clearGameContents() {
    while (gameContent.firstChild) {
        gameContent.removeChild(gameContent.firstChild);
    }
}

const game = {
    state: "intro",
    deck: null,
    round: 0,
    cardRows: null,
    description: null,
}

function resetGame() {
    game.state = "intro"
    game.deck = null
    game.round = 0
    game.cardRows = null
    game.description = null
    clearGameContents()
    const gameDescription = document.createElement("p")
    gameDescription.innerHTML = `
    To understand the game better, we'll play a simplified game with three rounds
    where exactly five cards are revealed each round. You'll then have a chance
    to guess the size of the deck.
    `
    gameContent.appendChild(gameDescription)
    gameButton.innerHTML = "Start Game"
}

function playRound() {
    const cards = game.deck.sample()
    cards.sort()
    game.round += 1
    game.cardRows.appendChild(getCardRowDiv(cards))
    if (game.round === 1) {
        game.description.innerHTML = `
        Round ${game.round}. Here, ${cards.length} cards were drawn from the
        deck. When you click "Next Round", the cards will be put back into the
        deck and another set of cards will be drawn.
        (They'll be kept on the screen for reference)
        `
    } else if (game.round === 2) {
        game.description.innerHTML = `
        Round ${game.round}. The process has been repeated and ${cards.length}
        cards are drawn from the deck once again.
        `
    } else if (game.round === 3) {
        game.description.innerHTML = `
        Round ${game.round}. This is the last round. You'll now have a chance
        to guess how many cards are in the deck. (Something to consider is the
        number of times you saw the same card. If the deck is huge do we expect
        to see a lot of repeats? What if the deck was small?)
        `
    } else {
        game.description.innerHTML = ""
    }
}

gameButton.onclick = () => {
    if (game.state === "intro") {
        clearGameContents()
        game.state = "playing"
        gameButton.innerHTML = "Next Round"
        game.deck = new Deck()
        game.cardRows = document.createElement("div")
        game.cardRows.classList.add("flex", "flex-col", "space-y-4")
        gameContent.appendChild(game.cardRows)
        game.description = document.createElement("p")
        gameContent.appendChild(game.description)
        playRound()
    } else if (game.state === "playing") {
        playRound()
        if (game.round === 3) {
            const guessInput = document.createElement("input")
            guessInput.classList.add("rounded", "p-2")
            guessInput.placeholder = "Deck size guess"
            guessInput.type = "text"
            guessInput.id = "guess_input"
            gameContent.appendChild(guessInput)
            guessInput.focus()
            game.state = "guessing"
            gameButton.innerHTML = "Guess"
        }
    } else if (game.state === "guessing") {
        const guessInput = document.getElementById("guess_input")
        const guess = parseInt(guessInput.value)
        let guessResult
        if (isNaN(guess) || !isFinite(guess) || guess <= 0) {
            guessResult = "You didn't make a valid guess. "
        } else {
            guessResult = `You guessed ${guess}. `
            if (Math.abs(guess - game.deck.size) <= 5) {
                guessResult += "Nice! "
            }
        }
        guessResult += `The actual size was ${game.deck.size}`
        const guessFeedback = document.createElement("p")
        guessFeedback.innerHTML = guessResult
        gameContent.appendChild(guessFeedback)
        game.state = "finished"
        gameButton.innerHTML = "Start Over"
    } else if (game.state === "finished") {
        resetGame()
    } else {
        console.log("Invalid game state: " + game.state)
    }
}

resetGame()
