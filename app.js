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

    const playGame = () => {
        // Current Player
        if (currentPlayer !== player1) {
            currentPlayer = player1;
        }

        // Initial empty array
        if (array !== ['', '', '', '', '', '', '', '', '']) {
            array = ['', '', '', '', '', '', '', '', ''];
        }

        gameBoard.renderArray(array);
        const boxes = document.querySelectorAll('.box');
        // Add event listeners to all boxes
        boxes.forEach((element) => {
            element.onclick = (e) => {
                let boxIndex = e.target.dataset.index;
                gameBoard.putMarker(array, currentPlayer, boxIndex);
                console.log(array);
                // Check for winning conditions
                if (checkForWinning(array, player1.marker, player2.marker)) {
                    console.log(`${currentPlayer.name} wins!`);
                    currentPlayer.score += 1; // End Game
                    // Prevent further clicks once game is over
                    document.querySelector('.gameboard').style.pointerEvents =
                        'none';
                } else if (!array.includes('')) {
                    // Check for a tie
                    console.log("It's a tie"); // End Game
                    document.querySelector('.gameboard').style.pointerEvents =
                        'none';
                } else {
                    alternate();
                }
            };
        });
    };
    return { playGame };
})();

game.playGame();
function playAgain() {
    document.querySelector('.gameboard').style.pointerEvents = 'auto';
    game.playGame();
}

// const boxes = document.querySelectorAll('.box');
// // Add event listeners to all boxes
// boxes.forEach((element) => {
//     element.addEventListener('click', (e) => {
//         console.log(e.target.dataset.index);
//     });
// });

//     // Select all boxes and convert Nodelist to Array
//     const boxes = Array.from(document.querySelectorAll('.box'));

//     const playGame = () => {
//         // Add a marker everytime an empty box is clicked
//         // Add event listeners to all boxes
//         boxes.forEach((element) => {
//             element.addEventListener('click', () => {
//                 // get box data-index
//                 let boxIndex = element.dataset.index;
//                 // if array's index is empty (""), allow to change it for a marker
//                 if (array[boxIndex] === '') {
//                     array[boxIndex] = currentPlayer.marker;
//                     gameBoard.renderArray(array);
//                 }
//                 // Check if there's a winner
//                 if (
//                     gameBoard.checkForWinning(
//                         array,
//                         player1.marker,
//                         player2.marker
//                     )
//                 ) {
//                     console.log(`The winner is ${currentPlayer.name}`);
//                     // Prevent further clicks once game is over
//                     document.querySelector('.gameboard').style.pointerEvents =
//                         'none';
//                     return; // End Game
//                 } else if (
//                     // Check for a tie
//                     !array.includes('')
//                 ) {
//                     console.log("It's a tie");
//                     document.querySelector('.gameboard').style.pointerEvents =
//                         'none';
//                     return; // End Game
//                 } else {
//                     alternate();
//                 }
//             });
//         });
//     };
//     return { playGame };
// })();

// game.playGame();

// Check for winning conditions
// const checkForWinning = (array, p1marker, p2marker) => {
//     if (
//         (array[0] === p1marker &&
//             array[1] === p1marker &&
//             array[2] === p1marker) ||
//         (array[3] === p1marker &&
//             array[4] === p1marker &&
//             array[5] === p1marker) ||
//         (array[6] === p1marker &&
//             array[7] === p1marker &&
//             array[8] === p1marker) ||
//         (array[0] === p1marker &&
//             array[3] === p1marker &&
//             array[6] === p1marker) ||
//         (array[1] === p1marker &&
//             array[4] === p1marker &&
//             array[7] === p1marker) ||
//         (array[2] === p1marker &&
//             array[5] === p1marker &&
//             array[8] === p1marker) ||
//         (array[0] === p1marker &&
//             array[4] === p1marker &&
//             array[8] === p1marker) ||
//         (array[2] === p1marker &&
//             array[4] === p1marker &&
//             array[6] === p1marker)
//     ) {
//         return true;
//     } else if (
//         (array[0] === p2marker &&
//             array[1] === p2marker &&
//             array[2] === p2marker) ||
//         (array[3] === p2marker &&
//             array[4] === p2marker &&
//             array[5] === p2marker) ||
//         (array[6] === p2marker &&
//             array[7] === p2marker &&
//             array[8] === p2marker) ||
//         (array[0] === p2marker &&
//             array[3] === p2marker &&
//             array[6] === p2marker) ||
//         (array[1] === p2marker &&
//             array[4] === p2marker &&
//             array[7] === p2marker) ||
//         (array[2] === p2marker &&
//             array[5] === p2marker &&
//             array[8] === p2marker) ||
//         (array[0] === p2marker &&
//             array[4] === p2marker &&
//             array[8] === p2marker) ||
//         (array[2] === p2marker &&
//             array[4] === p2marker &&
//             array[6] === p2marker)
//     ) {
//         return true;
//     }
// };
// return {
//     renderArray,
//     checkForWinning,
//     cleanBoard,
// };
