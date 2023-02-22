// Player Factory Function:

const player = (name, marker) => {
    return { name, marker };
};

// Gameboard Module

const gameBoard = (() => {
    // Select all boxes and convert Nodelist to Array
    const boxes = Array.from(document.querySelectorAll('.box'));
    const array = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];

    // Render every element on the array on the HTML grid
    const renderArray = () => {
        array.forEach((element, index) => {
            const boxId = `#box${index + 1}`;
            document.querySelector(boxId).textContent = element;
        });
    };
    return {
        renderArray,
    };
})();

gameBoard.renderArray();
