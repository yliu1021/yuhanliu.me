// import { Chart } from "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.8.0/chart.min.js"

const cardValuesInput = document.getElementById("card_values")
const resetButton = document.getElementById("reset")
const addCardsButton = document.getElementById("add_cards")
const roundsDiv = document.getElementById("rounds")
const graphCanvas = document.getElementById("best_guess_graph")
const gameSummaryText = document.getElementById("game_summary")

const state = {
    rounds: [],
    error: null,
    bestGuess: null,
    graph: new Chart(
        graphCanvas,
        {
            type: "line",
            data: {
                labels: [],
                datasets: [{
                    label: "Best Guess",
                    data: [],
                    borderColor: 'rgb(0, 0, 0)',
                }]
            }
        }
    )
}

/**
 * Computes likelihood of seeing a given number of unique
 * and identical cards between two rounds, given the deck
 * size is n.
 * Computes ((n - c1) choose (c2 - s)) / (n choose c2)
 * @param {string[]} round1 
 * @param {string[]} round2 
 * @param {string[]} n 
 */
function similarity(round1, round2, n) {
    const c1 = round1.length
    const c2 = round2.length
    let s = 0
    round1.forEach(card => {
        if (round2.includes(card)) {
            s += 1
        }
    })
    if (c1 + c2 - s > n) {
        console.log(`Round1: ${round1}, round2: ${round2}, n: ${n}`)
        // deck size too small
        return NaN
    }
    // numerators:
    // (n - c1), (n - c1) - (1), ..., (n - c1) - (c2 - s - 1)
    // 1, 2, ..., c2
    // denominators:
    // 1, 2, ..., c2 - s
    // (n), (n) - (1), ..., (n) - (c2 - 1)
    let numerators = []
    for (let i = n - c1; i >= (n - c1) - (c2 - s - 1); --i) {
        numerators.push(i)
    }
    for (let i = 1; i <= c2; ++i) {
        numerators.push(i)
    }
    let denominators = []
    for (let i = 1; i <= c2 - s; ++i) {
        denominators.push(i)
    }
    for (let i = n; i >= (n) - (c2 - 1); --i) {
        denominators.push(i)
    }
    while (numerators.length < denominators.length) {
        numerators.push(1)
    }
    while (numerators.length > denominators.length) {
        denominators.push(1)
    }
    numerators = numerators.sort()
    denominators = denominators.sort()
    let ans = 1
    numerators.forEach((numerator, i) => {
        const denominator = denominators[i]
        ans *= numerator / denominator
    })
    return ans
}

function computeProbabilities() {
    const uniqueCards = new Set()
    state.rounds.forEach(cards => {
        cards.forEach(card => {
            uniqueCards.add(card)
        })
    })
    const minN = uniqueCards.size
    const maxN = Math.max(minN * 2, minN + 25)
    const bestGuess = new Map()
    function normalize() {
        let sum = 0
        for (let i = minN; i <= maxN; ++i) {
            sum += bestGuess.get(i)
        }
        for (let i = minN; i <= maxN; ++i) {
            const x = bestGuess.get(i)
            bestGuess.set(i, x / sum)
        }
    }
    for (let i = minN; i <= maxN; ++i) {
        bestGuess.set(i, 1 / (maxN - minN + 1))
    }
    for (let k = 1; k < state.rounds.length; ++k) {
        for (let n = minN; n <= maxN; ++n) {
            let prod = 1
            for (let i = 0; i < k; ++i) {
                prod *= similarity(state.rounds[i], state.rounds[k], n)
            }
            prod *= bestGuess.get(n)
            bestGuess.set(n, prod)
        }
        normalize()
    }
    return bestGuess
}

function clear() {
    while (roundsDiv.firstChild) {
        roundsDiv.removeChild(roundsDiv.firstChild)
    }
    gameSummaryText.innerHTML = ""
}

function render() {
    clear()

    state.rounds.forEach((cards, i) => {
        const round = document.createElement("div")
        round.classList.add("flex", "flex-col")
        const roundTitle = document.createElement("p")
        roundTitle.classList.add("m-0", "font-bold")
        roundTitle.innerHTML = `Round ${i + 1}:`
        const roundCards = document.createElement("p")
        roundCards.classList.add("m-0")
        roundCards.innerHTML = cards.join(", ")
        round.appendChild(roundTitle)
        round.appendChild(roundCards)
        roundsDiv.appendChild(round)
    })

    if (state.error) {
        const error = document.createElement("p")
        error.classList.add("text-red-500", "text-semibold")
        error.innerText = state.error
        roundsDiv.appendChild(error)
    }

    if (state.bestGuess) {
        let bestGuess = 0
        let bestProb = 0
        let minKey = Infinity
        state.bestGuess.forEach((prob, key) => {
            if (key < minKey) {
                minKey = key
            }
            if (prob > bestProb) {
                bestGuess = key
                bestProb = prob
            }
        })
        gameSummaryText.innerHTML = `So far there are ${minKey} unique cards. Best guess is ${bestGuess} total cards with probability ${bestProb.toFixed(4)}`

        state.graph.data.labels = Array.from(state.bestGuess.keys())
        state.graph.data.datasets[0].data = Array.from(state.bestGuess.values())
        state.graph.update()
    } else {
        state.graph.data.labels = []
        state.graph.data.datasets[0].data = []
        state.graph.update()
    }
}

resetButton.onclick = () => {
    cardValuesInput.value = ""
    state.rounds = []
    state.error = null
    state.bestGuess = null
    render()
}

addCardsButton.onclick = () => {
    // Add new round of cards
    if (cardValuesInput.value.length > 0) {
        const cards = cardValuesInput.value.split(",").map(val => val.trim())
        const cardSet = new Set(cards)
        if (cards.length != cardSet.size) {
            state.error = "Warning: cards in one round can't have repeats"
        } else {
            state.error = null
        }
        state.rounds.push(Array.from(cardSet))
    }
    cardValuesInput.value = ""
    state.bestGuess = computeProbabilities()
    render()
}
