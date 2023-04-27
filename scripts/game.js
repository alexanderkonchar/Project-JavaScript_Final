"use strict";

document.getElementById("startButton").addEventListener('click', () => {
    // Get input and check if valid
    let numPairs = Math.floor(document.getElementById("numSymbols").value);
    if (numPairs > 8) numPairs = 8;
    else if (numPairs < 1) numPairs = 1;

    // Remove the starting form
    document.getElementById("startForm").remove();

    // Randomize symbols used in game
    const symbols = shuffleArray(['😃', '🐻', '🍔', '⚽', '🚀', '💡', '💕', '🎌']);
    let cards = [];

    // Prepare the game board
    const game = document.getElementById("game");
    const guesses = document.createElement("p");
    let guessCount = 0;
    guesses.appendChild(document.createTextNode(`Guesses: ${guessCount}`));

    // Add cards with randomized symbols
    for (let i = 0; i < numPairs; ++i) {
        for (let j = 0; j < 2; ++j) {
            // Create card backs
            const card_back = document.createElement("div");
            card_back.className = "card-back";
            // Attach listener when back of card is clicked on
            card_back.onclick = (e) => {
                // Flip the card
                e.target.replaceWith(card_front);

                // Get all the flipped cards that haven't been matched yet
                const pickedCards = document.querySelectorAll(".card-front:not([matched=true])");

                if (pickedCards.length <= 2) {
                    if (pickedCards.length === 2) {
                        guesses.innerHTML = `Guesses: ${++guessCount}`;

                        // Check if the fronts of the cards match
                        if (pickedCards.item(0).firstElementChild.innerHTML === pickedCards.item(1).firstElementChild.innerHTML) {
                            // Add the "matched" attribute to the cards
                            pickedCards.forEach((card) => card.setAttribute("matched", "true"));

                            CheckIfWin(numPairs);
                        } else {
                            // If they don't match, wait .5 seconds and flip them back over
                            for (const card of pickedCards) {
                                setTimeout(() => {
                                    card.click();
                                }, 500);
                            }
                        }
                    }
                }
            };

            // Create the card fronts
            const card_front = document.createElement("div");
            card_front.className = "card-front";
            // Assign a symbol to the card
            card_front.innerHTML = `<h1>${symbols[i]}</h1>`;
            card_front.onclick = (e) => {
                // If the cards are already matched, don't allow the user to flip them over
                if (!e.target.hasAttribute("matched"))
                    e.target.replaceWith(card_back);
            };

            // Add the cards to the array for shuffling
            cards.push(card_back);
        }
    }

    // Shuffle the cards
    cards = shuffleArray(cards);

    const board = document.createElement("div");
    board.setAttribute("class", "board");

    game.appendChild(board);
    game.appendChild(guesses);

    // Add the cards to the board
    cards.forEach((card) => {
        board.append(card);
    });
});

function CheckIfWin(numPairs) {
    // If the # of flipped pairs matches the total pairs in the game
    if (document.querySelectorAll(".card-front").length >= numPairs * 2) {
        // Congratulate the user and reset the board
        setTimeout(() => {
            alert("You Win!!");
            location.reload();
        }, 1);
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; --i) {
        const j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements at indices i and j
    }
    return array;
}
