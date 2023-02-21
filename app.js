// Player Factory Function:

const player = (name, marker) => {
    return { name, marker };
};

// Gameboard Module

const newGameBoard = (() => {
    const gameboardDiv = document.querySelector('.gameboard');
    const array = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];
    const renderArray = () => {
        array.forEach((element) => {
            gameboardDiv.append(document.createElement('div'));
        });
    };
    return {
        renderArray,
    };
})();

console.log(newGameBoard.renderArray());
