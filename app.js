// Player Factory Function:

const player = (name, marker) => {
    return { name, marker };
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
    return {
        renderArray,
    };
})();

// Game module

const game = (() => {
    // Initial empty array
    const array = ['', '', '', '', '', '', '', '', ''];
    // Select all boxes and convert Nodelist to Array
    const boxes = Array.from(document.querySelectorAll('.box'));
    // Add a marker everytime an empty box is clicked
    // Add event listeners to all boxes
    boxes.forEach((element) => {
        element.addEventListener('click', () => {
            // get box data-index
            let boxIndex = element.dataset.index;
            // if array's index is empty (""), allow to change it for a marker
            if (array[boxIndex] === '') {
                element.textContent = 'X';
            }
        });
    });

    gameBoard.renderArray(array);
})();
