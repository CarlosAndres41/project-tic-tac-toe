// Player Factory Function:

const player = (name, marker, score) => {
    return { name, marker, score };
};

// Gameboard Module

const gameBoard = (() => {
    // Render every element on the array on the HTML grid
    const renderArray = (array) => {
        array.forEach((element, index) => {
            const boxId = `#box${index + 1}`;
            document.querySelector(boxId).textContent = element;
        });
    };

    // Put player marker after each click
    const putMarker = (arr, currentPlayer, index) => {
        // if array's index is empty (""), allow to place a marker
        if (arr[index] === '') {
            arr[index] = currentPlayer.marker;
            gameBoard.renderArray(arr);
        }
    };
    return { renderArray, putMarker };
})();

// Game module

const game = (() => {
    // Create Players:
    let player1 = player('Player1', 'X', 0);
    let player2 = player('Player2', 'O', 0);
    let currentPlayer = player1;
    let array = ['', '', '', '', '', '', '', '', ''];

    // alternate between players
    const alternate = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    };
    const checkForWinning = (array, p1marker, p2marker) => {
        if (
            (array[0] === p1marker &&
                array[1] === p1marker &&
                array[2] === p1marker) ||
            (array[3] === p1marker &&
                array[4] === p1marker &&
                array[5] === p1marker) ||
            (array[6] === p1marker &&
                array[7] === p1marker &&
                array[8] === p1marker) ||
            (array[0] === p1marker &&
                array[3] === p1marker &&
                array[6] === p1marker) ||
            (array[1] === p1marker &&
                array[4] === p1marker &&
                array[7] === p1marker) ||
            (array[2] === p1marker &&
                array[5] === p1marker &&
                array[8] === p1marker) ||
            (array[0] === p1marker &&
                array[4] === p1marker &&
                array[8] === p1marker) ||
            (array[2] === p1marker &&
                array[4] === p1marker &&
                array[6] === p1marker)
        ) {
            return true;
        } else if (
            (array[0] === p2marker &&
                array[1] === p2marker &&
                array[2] === p2marker) ||
            (array[3] === p2marker &&
                array[4] === p2marker &&
                array[5] === p2marker) ||
            (array[6] === p2marker &&
                array[7] === p2marker &&
                array[8] === p2marker) ||
            (array[0] === p2marker &&
                array[3] === p2marker &&
                array[6] === p2marker) ||
            (array[1] === p2marker &&
                array[4] === p2marker &&
                array[7] === p2marker) ||
            (array[2] === p2marker &&
                array[5] === p2marker &&
                array[8] === p2marker) ||
            (array[0] === p2marker &&
                array[4] === p2marker &&
                array[8] === p2marker) ||
            (array[2] === p2marker &&
                array[4] === p2marker &&
                array[6] === p2marker)
        ) {
            return true;
        }
    };

    const updateScoreboard = () => {
        // Update scoreboard
        document.querySelector('.p1').textContent = `${player1.score}`;
        document.querySelector('.p2').textContent = `${player2.score}`;
    };

    const checkAfterClick = () => {
        // Check for winning conditions
        if (checkForWinning(array, player1.marker, player2.marker)) {
            // Display winner
            document.querySelector(
                '.winner'
            ).textContent = `${currentPlayer.name} wins!`;
            currentPlayer.score += 1; // End Game
            updateScoreboard();
            // Prevent further clicks once game is over
            document.querySelector('.gameboard').style.pointerEvents = 'none';
        } else if (!array.includes('')) {
            // Check for a tie
            document.querySelector('.winner').textContent = "It's a Tie!"; // End Game
            document.querySelector('.gameboard').style.pointerEvents = 'none';
        } else {
            alternate();
        }
    };

    const moveAI = () => {
        // Pick any available index randomly

        let getValidIndex = () => {
            let index = Math.floor(Math.random() * array.length);
            return array[index] === '' ? index : getValidIndex();
        };
        setTimeout(() => {
            gameBoard.putMarker(array, currentPlayer, getValidIndex());
            checkAfterClick();
        }, '500');
    };

    const playGame = () => {
        // Current Player
        currentPlayer = player1;

        // Initial empty array
        array = ['', '', '', '', '', '', '', '', ''];

        gameBoard.renderArray(array);
        const boxes = document.querySelectorAll('.box');
        // Add event listeners to all boxes
        boxes.forEach((element) => {
            element.onclick = (e) => {
                let boxIndex = e.target.dataset.index;
                gameBoard.putMarker(array, currentPlayer, boxIndex);
                checkAfterClick();
                if (currentPlayer.name === 'AI') {
                    moveAI();
                }
            };
        });
    };
    return { playGame, player1, player2 };
})();

// Game set-up module

const gameSetUp = (() => {
    let newGameBtn = document.querySelector('.new-game-btn');
    let p1PopUp = document.querySelector('.player1-popup');
    let rivalPopUp = document.querySelector('.choose-rival');
    let p2PopUp = document.querySelector('.player2-popup');
    const openPopUp = () => {
        p1PopUp.style.display = 'flex';
    };

    const closePopUp = () => {
        p1PopUp.style.display = 'none';
    };

    const nextPopUp = () => {
        let p1name = document.querySelector('input.p1name').value;
        game.player1.name = p1name === '' ? 'Player1' : p1name;
        document.querySelector('.p1score-name').textContent =
            p1name === '' ? 'Player1:' : `${p1name}:`;
        p1PopUp.style.display = 'none';
        rivalPopUp.style.display = 'flex';
    };

    const closeRivalPopUp = () => {
        rivalPopUp.style.display = 'none';
    };

    const closeP2PopUp = () => {
        p2PopUp.style.display = 'none';
    };

    const pickUser = () => {
        closeRivalPopUp();
        p2PopUp.style.display = 'flex';
    };

    const play = () => {
        let p2name = document.querySelector('input.p2name').value;
        game.player2.name = p2name === '' ? 'Player2' : p2name;
        document.querySelector('.p2score-name').textContent =
            p2name === '' ? 'Player2:' : `${p2name}:`;
        p2PopUp.style.display = 'none';
        newGameBtn.style.display = 'none';
        document.querySelector('.scoreboard-container').style.display = 'block';
        document.querySelector('.play-again').style.display = 'flex';
        game.playGame();
    };

    const playVsAI = () => {
        game.player2.name = 'AI';
        document.querySelector('.p2score-name').textContent = 'AI:';
        closeRivalPopUp();
        newGameBtn.style.display = 'none';
        document.querySelector('.scoreboard-container').style.display = 'block';
        document.querySelector('.play-again').style.display = 'flex';
        game.playGame();
    };

    return {
        openPopUp,
        closePopUp,
        nextPopUp,
        closeRivalPopUp,
        pickUser,
        closeP2PopUp,
        play,
        playVsAI,
    };
})();

// game.playGame();
function playAgain() {
    document.querySelector('.gameboard').style.pointerEvents = 'auto';
    document.querySelector('.winner').textContent = '';
    game.playGame();
}
